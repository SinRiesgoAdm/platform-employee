import {
    Controller,
    type Control,
    type FieldPath,
    type FieldValues,
    type RegisterOptions,
} from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';
interface SelectOption<TValue extends string | number> {
    value: TValue;
    label: string;
}
interface FormSelectProps<
    TFieldValues extends FieldValues,
    TValue extends string | number,
> {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues>;
    label: string;
    options: SelectOption<TValue>[];
    placeholder?: string;
    rules?: RegisterOptions<TFieldValues>;
    id?: string;
}
export function FormSelect<
    TFieldValues extends FieldValues,
    TValue extends string | number,
>({
    name,
    control,
    label,
    options,
    placeholder = 'Seleccionar',
    rules,
    id,
}: FormSelectProps<TFieldValues, TValue>) {
    const fieldId = id ?? String(name);
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const selectedOption = options.find(
                    (option) => option.value === field.value,
                );
                return (
                    <div className="min-w-0 space-y-1.5">
                        {' '}
                        <Label
                            htmlFor={fieldId}
                            className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground"
                        >
                            {' '}
                            {label}{' '}
                        </Label>{' '}
                        <Select
                            value={
                                field.value !== undefined &&
                                field.value !== null
                                    ? String(field.value)
                                    : ''
                            }
                            onValueChange={(value) => {
                                const selected = options.find(
                                    (option) => String(option.value) === value,
                                );
                                if (selected) {
                                    field.onChange(selected.value);
                                }
                            }}
                        >
                            {' '}
                            <SelectTrigger
                                id={fieldId}
                                className="w-full"
                                aria-invalid={fieldState.invalid}
                            >
                                {' '}
                                <SelectValue placeholder={placeholder}>
                                    {' '}
                                    {selectedOption?.label}{' '}
                                </SelectValue>{' '}
                            </SelectTrigger>{' '}
                            <SelectContent>
                                {' '}
                                {options.map((option) => (
                                    <SelectItem
                                        key={String(option.value)}
                                        value={String(option.value)}
                                    >
                                        {' '}
                                        {option.label}{' '}
                                    </SelectItem>
                                ))}{' '}
                            </SelectContent>{' '}
                        </Select>{' '}
                        {fieldState.error && (
                            <p className="text-xs text-destructive">
                                {' '}
                                {fieldState.error.message}{' '}
                            </p>
                        )}{' '}
                    </div>
                );
            }}
        />
    );
}

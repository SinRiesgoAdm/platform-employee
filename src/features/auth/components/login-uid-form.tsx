import { User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Label } from '@/shared/components/ui/label.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import {
    titleCCEmployee,
    titleEmployeeButtonSearchingLogin,
    titleEmployeeButtonStartLogin,
    titleEmployeeUidRequiredLogin,
} from '@/i18n/locales/es';

interface LoginUidFormValues {
    uid: string;
}

interface Props {
    defaultUid: string;
    isSubmitting: boolean;
    onSubmit: (uid: string) => void;
}

export const LoginUidForm = ({ defaultUid, isSubmitting, onSubmit }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginUidFormValues>({
        defaultValues: { uid: defaultUid },
    });

    return (
        <form
            className="space-y-5"
            onSubmit={handleSubmit(({ uid }) => onSubmit(uid.trim()))}
        >
            <div className="space-y-2">
                <Label htmlFor="usuario">{titleCCEmployee}</Label>
                <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        {...register('uid', {
                            validate: (value) =>
                                value.trim() !== '' ||
                                titleEmployeeUidRequiredLogin,
                        })}
                        id="usuario"
                        type="text"
                        inputMode="numeric"
                        autoComplete="username"
                        placeholder="ej. 1020304050"
                        className="pl-9"
                        aria-invalid={!!errors.uid}
                    />
                </div>
                {errors.uid && (
                    <p className="text-xs text-destructive">
                        {errors.uid.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-display text-brand-foreground transition-transform hover:-translate-y-0.5"
                style={{
                    background: 'var(--gradient-brand)',
                    boxShadow: 'var(--shadow-panel)',
                }}
            >
                {isSubmitting
                    ? titleEmployeeButtonSearchingLogin
                    : titleEmployeeButtonStartLogin}
            </Button>
        </form>
    );
};

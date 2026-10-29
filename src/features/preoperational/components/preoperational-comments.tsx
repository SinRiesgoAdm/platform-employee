import { MessageSquare } from 'lucide-react';
import { Label } from '@/shared/components/ui/label.tsx';
import { Textarea } from '@/shared/components/ui/textarea.tsx';
import { cn } from '@/shared/utils/cn.ts';
import { usePreoperational } from '@/features/preoperational/context/PreoperationalContext.tsx';

export const PreoperationalComments = () => {
    const { comments, setComments, failures, isCommentMissing } =
        usePreoperational();
    const isRequired = failures > 0;

    return (
        <div className="grid gap-2 sm:col-span-2">
            <Label
                htmlFor="comentarios"
                className={cn(isCommentMissing && 'text-destructive')}
            >
                Comentarios{isRequired ? ' *' : ''}
            </Label>
            <Textarea
                id="comentarios"
                rows={3}
                required={isRequired}
                aria-invalid={isCommentMissing}
                value={comments}
                onChange={(event) => setComments(event.target.value)}
                placeholder="Describe novedades, hallazgos o requerimientos de mantenimiento."
            />
            <p
                className={cn(
                    'flex items-center gap-1.5 text-xs',
                    isCommentMissing
                        ? 'font-medium text-destructive'
                        : 'text-muted-foreground',
                )}
            >
                <MessageSquare className="h-3.5 w-3.5" />
                {isRequired
                    ? 'Obligatorio: describe los puntos marcados en mal estado.'
                    : 'Opcional, pero recomendado si encuentras alguna novedad.'}
            </p>
        </div>
    );
};

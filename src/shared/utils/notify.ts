import { toast, type ExternalToast } from 'sonner';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastDescription = ExternalToast['description'];

interface NotifyOptions extends ExternalToast {
    title?: string;
    description?: ToastDescription;
    type?: ToastType;
}

const DEFAULT_TITLES: Record<ToastType, string> = {
    error: 'Error',
    success: 'Éxito',
    warning: 'Advertencia',
    info: 'Información',
};

const TOAST_STYLES: Record<ToastType, string> = {
    success:
        'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
    error: 'bg-red-500/10 text-red-600 border-red-500/30 dark:text-red-400',
    warning:
        'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400',
    info: 'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400',
};

export const notify = ({
    title,
    description,
    type = 'info',
    className = '',
    position = 'bottom-center',
    ...rest
}: NotifyOptions) => {
    const combinedClassName = `${TOAST_STYLES[type]} ${className}`.trim();
    const finalTitle = title || DEFAULT_TITLES[type];

    return toast[type](finalTitle, {
        description,
        className: combinedClassName,
        position,
        ...rest,
    });
};

type ShorthandFn = {
    (
        message: ToastDescription,
        options?: ExternalToast,
    ): ReturnType<typeof toast>;
    (
        title: string,
        description: ToastDescription,
        options?: ExternalToast,
    ): ReturnType<typeof toast>;
};

const createShorthand = (type: ToastType): ShorthandFn => {
    return ((
        titleOrMessage: ToastDescription,
        descriptionOrOptions?: ToastDescription | ExternalToast,
        options?: ExternalToast,
    ) => {
        if (
            typeof descriptionOrOptions === 'string' ||
            typeof descriptionOrOptions === 'function'
        ) {
            return notify({
                title: String(titleOrMessage),
                description: descriptionOrOptions,
                type,
                ...options,
            });
        }

        return notify({
            description: titleOrMessage,
            type,
            ...(descriptionOrOptions as ExternalToast),
        });
    }) as ShorthandFn;
};

notify.success = createShorthand('success');
notify.error = createShorthand('error');
notify.warning = createShorthand('warning');
notify.info = createShorthand('info');

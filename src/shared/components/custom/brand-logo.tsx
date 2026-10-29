import { cn } from '@/shared/utils/cn.ts';

interface Props {
    className?: string;
    decorative?: boolean;
}

export const BrandLogo = ({ className, decorative = true }: Props) => {
    return (
        <img
            src="/logo.svg"
            width={90}
            height={90}
            alt={decorative ? '' : 'sinriesgo.co'}
            aria-hidden={decorative || undefined}
            draggable={false}
            decoding="async"
            className={cn(
                'h-4 w-4 shrink-0 select-none object-contain',
                className,
            )}
        />
    );
};

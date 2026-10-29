import { Button } from '@/shared/components/ui/button.tsx';

interface props {
    page: string;
    maxPage: number;
    maxAllowedPage: number;
    onPageChange: (page: number) => void;
}

export const PaginationQuestionComponent = (props: props) => {
    return (
        <div
            className="mt-4 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Páginas del cuestionario"
        >
            {Array.from({ length: props.maxPage }).map((_, value) => {
                const isDisabled = value + 1 > props.maxAllowedPage;

                return (
                    <Button
                        key={value}
                        disabled={isDisabled}
                        type="button"
                        variant={
                            (value + 1).toString() === props.page.toString()
                                ? 'default'
                                : 'outline'
                        }
                        size="sm"
                        onClick={() => props.onPageChange(value + 1)}
                        className="min-w-10"
                    >
                        Pag. {value + 1}
                    </Button>
                );
            })}
        </div>
    );
};

interface props {
    name: string;
    value: string;
}

export const ItemEmployeeDetail = (props: props) => {
    return (
        <div className="min-w-0">
            <span className="block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {props.name}
            </span>
            <span className="mt-0.5 block truncate text-sm font-medium text-foreground">
                {props.value}
            </span>
        </div>
    );
};

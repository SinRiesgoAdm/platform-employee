export const userInitials = (name: string) => {
    return name
        ? name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)
              .toUpperCase()
        : 'EP';
};

export function dateToHumanReadable(date: string): string {
    if (date === '') {
        return 'never'
    }
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }
    return new Date(date).toLocaleDateString('es-ES', options)
}
export function purgeLocalStorage(): void {
    localStorage.removeItem('x-authorization')
    localStorage.removeItem('userID')
    localStorage.removeItem('user')
}

export default function sortingUsers(users) {
    return [...users].sort((a, b) => a.displayName > b.displayName ? 1 : -1)
}
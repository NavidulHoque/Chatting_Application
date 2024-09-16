export default function renderSearchedUsers(users, searchUsers) {
    return users.filter(user => user.displayName.includes(searchUsers))
}
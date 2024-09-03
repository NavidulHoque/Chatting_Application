export default function sortingFriends(friends) {
    return [...friends].sort((a, b) => a.friendName > b.friendName ? 1 : -1)
}
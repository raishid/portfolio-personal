export const getGistById = async (gistId: string) => {
    const response = await fetch('https://api.github.com/gists/' + gistId)
    return response.json()
}

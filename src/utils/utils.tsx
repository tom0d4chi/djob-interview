export const computeRating = (likes: number, dislikes: number): {display: string, likeBarWidth: number} => {
    const rating = (likes/(likes+dislikes))
    return ({
        display: (rating*10).toFixed(1),
        likeBarWidth: rating*100
    })
}
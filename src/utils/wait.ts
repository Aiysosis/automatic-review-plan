export const waitSomeTime = (time: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}
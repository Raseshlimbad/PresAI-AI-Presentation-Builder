export const buySubscription = async (buyUserId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_URL}/buy`, {
        method: "POST",
        body: JSON.stringify({buyUserId}),
    });
}
 
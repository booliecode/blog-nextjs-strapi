import { Attributes, Player } from "../types/game";


export async function getStaticPropsLive():Promise<Player[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/players`);
    const playersData = await res.json();
    return playersData.data;
}
  
export function updatePlayerAPI(player:number, attributes:Attributes):void {
    const data = JSON.stringify({
      data: {
        "level": attributes.level,
        "attack": attributes.attack,
      }
    });
  
    const res = fetch(`${process.env.NEXT_PUBLIC_HOST}/api/players/${player}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
}
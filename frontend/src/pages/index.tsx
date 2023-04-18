import Head from 'next/head';

interface Attributes {
  name: string;
  attack: number;
  level: number;
}

interface Player {
  attributes: Attributes;
  id: number;
}
interface Game {
  players: Array<Player>;
}


import React, { useState, useEffect } from 'react';

export default function Home(game: Game) {
  const [player, setPlayer] = useState(game.players);
  const [refreshToken, setRefreshToken] = useState(Math.random());

  async function getStaticPropsLive() {
    const res = await fetch(`http://localhost:1337/api/players`);
    const playersData = await res.json();
    return playersData.data;
  }

  useEffect(() => {
    getStaticPropsLive()
      .then(playersData => {
        setPlayer(playersData)
      })
      .finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), 2000);
      });
  }, [refreshToken])

  function setLevel(playerId: number, level:number) : void {
    let updatedPlayer = [...player].find((playerObject) => playerObject.id === playerId);
    if(updatedPlayer) {
      updatedPlayer.attributes.level = level;
      player[player.indexOf(updatedPlayer)] = updatedPlayer;
      const playerList = [...player];
      setPlayer(playerList);
      updatePlayerAPI(playerId, updatedPlayer.attributes);
    }
  }
  function setAttack(playerId: number, attack:number) : void {
    let updatedPlayer = [...player].find((playerObject) => playerObject.id === playerId);
    if(updatedPlayer) {
      updatedPlayer.attributes.attack = attack;
      player[player.indexOf(updatedPlayer)] = updatedPlayer;
      const playerList = [...player];
      setPlayer(playerList);
      updatePlayerAPI(playerId, updatedPlayer.attributes);
    }
  }
  return (
    <>
      <Head>
        <title>Munchkin PlayerTable</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl underline">
          Willkommen bei Munchkin PlayerTable
        </h1>
        <div>
          <h2 className='text-2xl font-bold'>aktuelle Spieler</h2>
          <table className="table-fixed border-collapse border border-slate-400 mb-4 w-full">
            <thead>
              <tr>
                <th className='border border-slate-300'>Name</th>
                <th className='border border-slate-300' colSpan={2}>Level</th>
                <th className='border border-slate-300' colSpan={2}>Attack</th>
              </tr>
            </thead>
            <tbody>
              {player?player.map((playerObject) => (
                <tr key={playerObject.id}>
                  <td className='border border-slate-100 font-bold'>{playerObject.attributes.name}</td>
                  <td className='border border-slate-100 text-center' colSpan={2}>{playerObject.attributes.level}</td>
                  <td className='border border-slate-100 text-center' colSpan={2}>{playerObject.attributes.attack}</td>
                </tr>
              )):null}
            </tbody>
          </table>
          <h2 className='text-2xl font-bold'>Spieler bearbeiten</h2>
          <table className="table-fixed border-collapse border border-slate-400 w-full">
            <thead>
              <tr>
                <th className='border border-slate-300'>Name</th>
                <th className='border border-slate-300' colSpan={2}>Level</th>
                <th className='border border-slate-300' colSpan={2}>Attack</th>
              </tr>
            </thead>
            <tbody>
              {player?player.map((playerObject) => (
                <>
                <tr key={playerObject.id}>
                  <td className='border border-slate-100 font-bold'>{playerObject.attributes.name}</td>
                  <td className='border border-slate-100 text-center' colSpan={2}>{playerObject.attributes.level}</td>
                  <td className='border border-slate-100 text-center' colSpan={2}>{playerObject.attributes.attack}</td>
                </tr>
                <tr>
                  <td className='border border-slate-100'>
                    <button className="text-white bg-blue-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    reset Player
                    </button>
                  </td>
                  <td className='border border-slate-100'>
                    <button onClick={() => setLevel(playerObject.id, playerObject.attributes.level + 1)} className="text-white bg-green-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Level Up
                    </button>
                  </td>
                  <td className='border border-slate-100'>
                    <button 
                      onClick={() => setLevel(playerObject.id, playerObject.attributes.level - 1)} 
                      className="text-white bg-red-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Level Down
                    </button>
                  </td>
                  <td className='border border-slate-100'>
                    <button 
                      onClick={() => setAttack(playerObject.id, playerObject.attributes.attack + 1)}
                      className="text-white bg-green-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Attack Up
                    </button>
                  </td>
                  <td className='border border-slate-100'>
                    <button 
                      onClick={() => setAttack(playerObject.id, playerObject.attributes.attack - 1)}
                      className="text-white bg-red-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Attack down
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className='bg-color-black p-4 border border-slate-100' colSpan={5}></td>
                </tr>
                </>
              )):null}
            </tbody>
          </table>
          <h2 className='text-2xl font-bold'>Spieler erstellen</h2>
        </div>
      </main>
    </>
  )
}


export async function getStaticProps() {
  // get data from external API
  const res = await fetch(`http://localhost:1337/api/players`);
  const players = await res.json();
  console.log(players.data);
  return {
    props: {players: players.data},
  }
}

export async function updatePlayerAPI(player:number, attributes:Attributes) {
  const data = JSON.stringify({
    data: {
      "level": attributes.level,
      "attack": attributes.attack,
    }
  });

  const res = await fetch(`http://localhost:1337/api/players/${player}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
}
import Link from 'next/link';
export default function About() {
return (
    <div><center>
    <header id="header" className='text-center'>
    <h1>ABOUT</h1>
    </header>
    <div className='warna'>
    <div className='bodyAbout'>
    <div className="event-details">
        <p>Konser Musik dalam rangka perayaan HUT Jakarta</p>
        <p>Diadakan selama 3 hari berurut-urut</p>
        <p>Lokasi : Gambir Expo Kemayoran</p>
        <p>Jadwal : 09-11 September 2023</p>
    </div>

    <div className="live">
        <h2>Live Performance</h2>
        <h3>Konser Ambyar</h3>
            <p>NDX AKA</p>
            <p>Aftershine</p>
            <p>Lavora</p>
            <p>Guyon Waton</p>

        <h3>Konser Masa Lalu</h3>
            <p>Tiara Andini</p>
            <p>Mahalini</p>
            <p>Yura Yunita</p>
            <p>Awdella</p>
        
        <h3>Konser Nyantui</h3>
            <p>Dewa 19</p>
            <p>Vierratale</p>
            <p>Fiersa Besari</p>
            <p>Nadin Amizah</p>
    </div>

    <div className="ticket-price">
        <h2>Harga Tiket</h2>
        <p>Rp. 150.000 - Rp. 500.000</p>
        
    </div>
    </div>
    </div>
        </center>
    </div>

)

}

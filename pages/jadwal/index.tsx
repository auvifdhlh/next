import Link from 'next/link';
export default function Jadwal() {
return (
    <div>
    <header id="header" className='text-center'>
    <h1>JADWAL</h1>
    </header>
    <div className='bodyJadwal'>
    <div className="card lineUp-card">
    <h3>Konser Ambyar</h3>
        <p>Tanggal: 09 September 2023</p>
        <p>Waktu: 19:00 - 22:00</p>
        <div className="details">
            <p>Live Performance:</p>
            <div className='lineUp'>
                <p>Guyon Waton</p>
                <p>Aftershine</p>
                <p>Feel Koplo</p>
                <p>NDX-AKA</p>
            </div>
        </div>
    </div>
    <div className="card lineUp-card">
        <h3>Konser Masa Lalu</h3>
        <p>Tanggal: 10 September 2023</p>
        <p>Waktu: 20:00 - 23:00</p>
        <div className="details">
            <p>Live Performance:</p>
            <div className='lineUp'>
                <p>Tiara Andini</p>
                <p>Mahalini</p>
                <p>Yura Yunita</p>
                <p>Awdella</p>
            </div>
        </div>
    </div>
    <div className="card lineUp-card">
    <h3>Konser Nyantui</h3>
        <p>Tanggal: 11 September 2023</p>
        <p>Waktu: 18:30 - 23:00</p>
        <div className="details">
            <p>Live Performance:</p>
            <div className='lineUp'>
                <p>Dewa 19</p>
                <p>Vieratalle</p>
                <p>Fiersa Besari</p>
                <p>Nadin Amizah</p>
            </div>
        </div>
    </div>
    </div>
    </div>
)

}
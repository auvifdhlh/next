import Link from 'next/link';
export default function Home() {
  return(
    <div className='container-home'>
        <header>
            <div className="logo">PEKAN GEMBIRA RIA</div>
            <nav>
                <ul id='navbar'>
                    <li><a href="/about">ABOUT</a></li>
                    <li><a href="/data">PESAN</a></li>
                    <li><a href="/jadwal">JADWAL</a></li>
                </ul>
            </nav>
        </header>
    </div>
  )
}
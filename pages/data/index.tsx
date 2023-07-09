import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";

 
const koneksi = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/tiket_konser" 
});

export default function FormFestivalMusik() {
  const [stateid_tiket, setid_tiket] = useState("");
  const [statenama_pemesan, setnama_pemesan] = useState("");
  const [statealamat_pemesan, setalamat_pemesan] = useState("");
  const [statetanggal_pemesan, settanggal_pemesan] = useState("yyy-mm-dd");
  const [statejenis_tiket, setjenis_tiket] = useState("");
  const [statetanggal_konser, settanggal_konser] = useState("yyy-mm-dd");
  const [statefoto, setfoto] = useState("");
  const [konser, setKonser] = useState(null);
  const [stateedit, setEdit] = useState("hide");
  const [stateadd,setAdd]=useState("hide");
  const [statebutonadd,setbtnAdd]=useState("show");

  function formatDate(date) {
    var d = new Date(date);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();
  
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
  
    return [year, month, day].join('-');
  }
  
   
  const handleSubmitAdd =  (event) => {  
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksi
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })

      .catch((err) => {
        console.log(err);
      });
  }

  const handleSubmitEdit =  (event) => {
    event.preventDefault();
    const address = event.target.id_tiket.value;
  
    const formData = {
      id_tiket: event.target.id_tiket.value,
      nama_pemesan: event.target.nama_pemesan.value,
      alamat_pemesan: event.target.alamat_pemesan.value,
      tanggal_pemesan: event.target.tanggal_pemesan.value,
      jenis_tiket: event.target.jenis_tiket.value,
      tanggal_konser: event.target.tanggal_konser.value,
      
    }

  const confirmation = window.confirm("Apakah anda yakin sudah melakukan perubahan data?");
  if (confirmation) {
    koneksi
      .put( address,formData)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  
    }else{
      window.location.reload();
    }
  }

  const handleAdd = (event) => {
    
    setAdd("show ");
    setbtnAdd("hide");
    setEdit("hide");    
 }
 const handleCancelAdd = (event) => {
    
  setAdd("hide");
  setbtnAdd("show");
  setEdit("hide");

   
}


  const handleCancelEdit = (event) => {  
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setnama_pemesan("");
    setid_tiket("");
    setalamat_pemesan("");
    settanggal_pemesan(formatDate("2018-07-22"));
    setjenis_tiket("");
    settanggal_konser("");
    setfoto("");
  }

  const handleDelete = (event) => {
    event.preventDefault();
    var id_tiket = event.target.value;
    koneksi.delete(`/${id_tiket}`)
      .then(response => {
        console.log('Data berhasil dihapus:', response.data);
        window.location.reload();
        setKonser(
          konser.filter((konser) => {
            return konser.id_tiket !== id_tiket;
          })
        )
      })
      
      .catch(error => {
        console.error('Gagal menghapus data:', error);
      })
  }

  const handleEdit = (event) => {
    event.preventDefault();
    var id_tiket = event.target.value;

    const konserEdit =  konser.filter((konser) => {
      return konser.id_tiket == id_tiket;
    });
    
    if(konserEdit!=null){
      setid_tiket(konserEdit[0].id_tiket);
      setnama_pemesan(konserEdit[0].nama_pemesan);
      setalamat_pemesan(konserEdit[0].alamat_pemesan);
      settanggal_pemesan(formatDate(konserEdit[0].tanggal_pemesan));
      setjenis_tiket(konserEdit[0].jenis_tiket);
      settanggal_konser(formatDate(konserEdit[0].tanggal_konser));
      setAdd("hide");
      setbtnAdd("show");
      setEdit("show");
    }
  }

  useEffect(() => {
    async function getkonser() {
      const response = await koneksi.get("/").then(function (axiosResponse) {
        setKonser(axiosResponse.data.data);
      })
        
      .catch(function (error) {   
        alert('error from konser in api konser: '+error);
      });
    }
    
    getkonser();
  }, []);

if(konser==null){
  return(
    <div>
      waiting...
    </div>
  )
}else{
  return (
    <div>
<header id="header" className='text-center'>
    <h1>PESAN TIKET</h1>
    </header> <br /><br /><br /><br />
      <center>
      <button id="btnadd" onClick={handleAdd} className={statebutonadd}
      style={{padding:"12px",borderRadius:"10px"}}
      >Pesan</button> 

      <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
        <table border={0}>
          <tbody>
            
            <tr>
              <td><label> Id Tiket:</label></td>
              <td><input type="text" id="id_tiket" name="id_tiket" /></td>
            </tr>
            
            <tr>
              <td><label> Nama Pemesan:</label></td>
              <td><input type="text" id="nama_pemesan" name="nama_pemesan" /></td>
            </tr>
        
            <tr>
              <td><label> Foto:</label></td>
              <td><input type="file" name="image"/></td>
            </tr>
        
            <tr>
              <td><label> Tanggal Pemesan:</label></td>
              <td><input type="date" name="tanggal_pemesan" min="1970-01-01" max="2025-12-31"/></td>
            </tr>
        
            <tr>
              <td><label> Alamat Pemesan:</label></td>
              <td><textarea id="address" style={{resize: "none"}} name="alamat_pemesan"></textarea></td>
            </tr>

            <tr>
              <td><label> Jenis Tiket:</label></td>
              <td><textarea id="text"  name="jenis_tiket"></textarea></td>
            </tr>

            <tr>
              <td><label> Tanggal Konser:</label></td>
              <td><input type="date" name="tanggal_konser" min="1970-01-01" max="2025-12-31"/></td>
            </tr>
          
          </tbody>
        </table>
        <input type="submit" 
        style={{padding: "3px",
        color:"white",
        border:"none",
        backgroundColor:"#316879",
        cursor: "pointer",
        borderRadius:"3px",
      }}
        />

        <input type="button" value="cancel" onClick={handleCancelAdd} 
         style={{padding: "3px",
         color:"white",
         border:"none",
         backgroundColor:"#316879",
         cursor: "pointer",
         borderRadius:"3px"
        }}
        />

      </form>  
      
      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}> 
        <table border={0}>
          <tbody>
            
            <tr>
              <td><label> Id Tiket:</label></td>
              <td><input type="text" id="id_tiket" value={stateid_tiket} name="id_tiket"/></td>
            </tr>
        
            <tr>
              <td><label> Nama Pemesan:</label></td>
              <td><input type="text" id="nama_pemesan" value={statenama_pemesan} name="nama_pemesan" onChange={(e) => setnama_pemesan(e.target.value)} /></td>
            </tr>
            
            <tr>
              <td><label> Foto:</label></td>
              <td><img src={statefoto} width="80"/></td>
            </tr>
            
            <tr>
              <td><label> Tanggal Pemesan:</label></td>
              <td><input type="date" value={statetanggal_pemesan} name="tanggal_pemesan" onChange={(e) => settanggal_pemesan(e.target.value)} min="1970-01-01" max="2025-12-31"/></td>
            </tr>
        
            <tr>
              <td><label> Alamat Pemesan:</label></td>
              <td><textarea id="address" style={{resize: "none"}} value={statealamat_pemesan} name="alamat_pemesan"  onChange={(e) => setalamat_pemesan(e.target.value)}></textarea></td>
            </tr>

            <tr>
              <td><label> Jenis Tiket:</label></td>
              <td><textarea id="text" style={{resize: "none"}} value={statejenis_tiket} name="jenis_tiket"  onChange={(e) => setjenis_tiket(e.target.value)}></textarea></td>
            </tr>

            <tr>
              <td><label> Tanggal Konser:</label></td>
              <td><input type="date" value={statetanggal_konser} name="tanggal_konser" onChange={(e) => settanggal_konser(e.target.value)} min="1970-01-01" max="2025-12-31"/></td>
            </tr>

          </tbody>
        </table>
        <input type="Submit" />
        <input type="button" value="cancel" onClick={handleCancelEdit} />
      </form>  
      
      <br/>
      <br/>
      
      <p style={{fontSize:"18px", backgroundColor:"#316879",color:"white",width:"15%",padding:"7px",borderRadius:"10px"}}>
        TABEL PEMESANAN </p><br />
      
      <table border={1}>
        <thead style={{backgroundColor:"#316879", color:"white"}}>
          <tr >
            <td><b>Id Tiket</b></td> 
            <td><b>Nama Pemesan </b></td>
            <td><b>Foto</b></td>
            <td><b>Tanggal Pemesan</b></td>
            <td><b>Alamat Pemesan</b></td>
            <td><b>Jenis Tiket</b></td>
            <td><b>Tanggal Konser</b></td>
            <td colSpan={2}><b>Action</b></td>
          </tr>
        </thead>
        <tbody>
          {konser.map((konser) => 
            <tr>
              <td>{konser.id_tiket}</td>
              <td>{konser.nama_pemesan}</td>
              <td><img src={konser.foto} width="80"/></td>
              <td>{konser.tanggal_pemesan}</td>
              <td>{konser.alamat_pemesan}</td>
              <td>{konser.jenis_tiket}</td>
              <td>{konser.tanggal_konser}</td>
              <td><button onClick={handleEdit} value={konser.id_tiket}
              style={{borderRadius:"8px"}}
              >edit</button></td>
              <td><button onClick={handleDelete} value={konser.id_tiket}
              style={{borderRadius:"8px"}}
              >delete</button></td>
            </tr>
          )}     
        </tbody>
      </table>
      </center>
    </div>
  )
}
}

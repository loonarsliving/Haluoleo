'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './OrderForm.module.css';

const PRICE = 89000;

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function OrderForm() {
  const [qty, setQty] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<{ waLink: string } | null>(null);

  const total = PRICE * qty;

  function changeQty(delta: number) {
    setQty((q) => Math.max(1, Math.min(99, q + delta)));
  }

  async function handleSubmit() {
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      alert('Nama, nomor WA, alamat, dan kota wajib diisi.');
      return;
    }
    setSending(true);
    const payload = {
      product: 'HydraGlow Advanced Brightening Lotion',
      customer_name: name.trim(),
      phone: phone.trim(),
      address: `${address.trim()}, ${city.trim()}`,
      city: city.trim(),
      province,
      district,
      postal_code: postalCode,
      qty,
      unit_price: PRICE,
      total_price: total,
      note,
      payment_method: 'COD',
      status: 'baru',
      source: 'website-beauty',
      created_at: new Date().toISOString(),
    };
    try {
      await supabase.from('beauty_orders').insert([payload]);
    } catch (err) {
      console.warn(err);
    }
    const wm = encodeURIComponent(
      `Halo Loonars Beauty! Saya order HydraGlow.\nNama: ${name}\nWA: ${phone}\nJumlah: ${qty} botol\nTotal: ${formatRp(total)}\nAlamat: ${address}, ${city}`
    );
    setOk({ waLink: `https://wa.me/6282228885223?text=${wm}` });
  }

  if (ok) {
    return (
      <div className={styles.codGrid}>
        <div className={styles.okBox}>
          <div className={styles.okIcon}>🎉</div>
          <div className={styles.okTitle}>Pesanan Diterima!</div>
          <div className={styles.okDesc}>
            Terima kasih sudah memesan HydraGlow.<br />
            Tim kami akan memproses dan mengirimkan pesananmu.<br />
            Pantau via WhatsApp: <strong style={{ color: '#fff' }}>+62 822-2888-5223</strong>
          </div>
          <a href={ok.waLink} target="_blank" rel="noopener noreferrer" className={styles.waLink}>💬 Chat via WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.codGrid}>
      <div>
      <div className={styles.codFb}>
        <div className={styles.fbTitle}>Data Penerima</div>
        <div className={styles.fbSub}>Isi lengkap agar pengiriman tepat sasaran</div>
        <div className={styles.fg}>
          <label className={styles.fLbl}>Nama Lengkap <span className={styles.fReq}>*</span></label>
          <input className={styles.fInp} type="text" placeholder="Nama penerima" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.fg}>
          <label className={styles.fLbl}>No. WhatsApp <span className={styles.fReq}>*</span></label>
          <input className={styles.fInp} type="tel" placeholder="08xxxxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className={styles.fg}>
          <label className={styles.fLbl}>Alamat Lengkap <span className={styles.fReq}>*</span></label>
          <textarea className={`${styles.fInp} ${styles.fTa}`} placeholder="Jalan, nomor, RT/RW, kelurahan..." value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className={styles.formRow2}>
          <div className={styles.fg}>
            <label className={styles.fLbl}>Kota / Kabupaten <span className={styles.fReq}>*</span></label>
            <input className={styles.fInp} type="text" placeholder="Makassar" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className={styles.fg}>
            <label className={styles.fLbl}>Provinsi</label>
            <input className={styles.fInp} type="text" placeholder="Sulawesi Selatan" value={province} onChange={(e) => setProvince(e.target.value)} />
          </div>
        </div>
        <div className={styles.formRow2}>
          <div className={styles.fg}>
            <label className={styles.fLbl}>Kecamatan</label>
            <input className={styles.fInp} type="text" placeholder="Kecamatan" value={district} onChange={(e) => setDistrict(e.target.value)} />
          </div>
          <div className={styles.fg}>
            <label className={styles.fLbl}>Kode Pos</label>
            <input className={styles.fInp} type="text" placeholder="90123" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={styles.codFb} style={{ marginTop: '1px' }}>
        <div className={styles.fbTitle}>Pesanan</div>
        <div className={styles.prodRow}>
          <div>
            <div className={styles.prodName}>HydraGlow Advanced Brightening Lotion</div>
            <div className={styles.prodPrice}>Rp 89.000 / botol</div>
          </div>
          <div className={styles.qtyC}>
            <button type="button" className={styles.qBtn} onClick={() => changeQty(-1)}>−</button>
            <span className={styles.qVal}>{qty}</span>
            <button type="button" className={styles.qBtn} onClick={() => changeQty(1)}>+</button>
          </div>
        </div>
        <div className={styles.subtotalRow}><span>Subtotal produk</span><span className={styles.subtotalVal}>{formatRp(total)}</span></div>
        <div className={styles.fg} style={{ marginTop: '.5rem' }}>
          <label className={styles.fLbl}>Catatan (opsional)</label>
          <input className={styles.fInp} type="text" placeholder="Permintaan khusus..." value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>
      </div>

      <div className={styles.codSum}>
        <div className={styles.csTitle}>Ringkasan &amp; Konfirmasi</div>
        <div className={styles.csRow}><span className={styles.csL}>Produk</span><span className={styles.csV}>{formatRp(total)}</span></div>
        <div className={styles.csRow}><span className={styles.csL}>Ongkir</span><span className={styles.csV}>Dihitung saat konfirmasi</span></div>
        <div className={styles.csRow}><span className={styles.csL}>Biaya COD</span><span className={styles.csV}>Rp 0</span></div>
        <div className={styles.csTotal}><span className={styles.csTl}>Total Bayar</span><span className={styles.csTv}>{formatRp(total)}</span></div>
        <div className={styles.csNote}>💡 Bayar saat paket tiba. Tidak perlu transfer dulu.</div>
        <button type="button" disabled={sending} className={styles.btnOrder} onClick={handleSubmit}>
          {sending ? 'Memproses...' : '🛒 Konfirmasi Pesanan COD'}
        </button>
        <p className={styles.codNote}>Dengan memesan, kamu setuju dihubungi tim kami via WhatsApp.</p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import shared from '../detail/shared.module.css';
import styles from './ContactForm.module.css';

const PROJECTS = [
  'Loonars Private Living (Yogyakarta)',
  'Al Fath Introvert House (Makassar)',
  'Griya Cariu Indah 3 (Bogor)',
  'Loonars Beauty',
  'Lainnya / Umum',
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Nama dan nomor WhatsApp wajib diisi.');
      return;
    }
    setSending(true);
    try {
      await supabase.from('contact_messages').insert([
        { name: name.trim(), phone: phone.trim(), project, message: message.trim(), created_at: new Date().toISOString() },
      ]);
    } catch (err) {
      console.warn(err);
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className={styles.okBox}>
        <div className={styles.okIcon}>✅</div>
        <div className={styles.okTitle}>Pesan Terkirim!</div>
        <div className={styles.okDesc}>Tim kami akan menghubungi kamu via WhatsApp dalam 1×24 jam kerja.</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formTitle}>Kirim Pertanyaan</div>
      <div className={styles.formSub}>Kami akan menghubungi via WhatsApp dalam 1×24 jam kerja.</div>

      <div className={styles.fg}>
        <label className={styles.fLbl}>Nama Lengkap <span className={styles.fReq}>*</span></label>
        <input className={styles.fInp} type="text" placeholder="Nama kamu" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={styles.fg}>
        <label className={styles.fLbl}>Nomor WhatsApp <span className={styles.fReq}>*</span></label>
        <input className={styles.fInp} type="tel" placeholder="08xxxxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className={styles.fg}>
        <label className={styles.fLbl}>Proyek yang Diminati</label>
        <select className={`${styles.fInp} ${styles.fSel}`} value={project} onChange={(e) => setProject(e.target.value)}>
          <option value="">Pilih proyek...</option>
          {PROJECTS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className={styles.fg}>
        <label className={styles.fLbl}>Pertanyaan / Pesan</label>
        <textarea className={`${styles.fInp} ${styles.fTa}`} placeholder="Tuliskan pertanyaan atau pesanmu..." value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button type="submit" disabled={sending} className={shared.btnP} style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}>
        <span>{sending ? 'Mengirim...' : 'Kirim Pertanyaan →'}</span>
      </button>
      <p className={styles.disclaimer}>Dengan mengirim form ini, kamu setuju dihubungi tim kami via WhatsApp.</p>
    </form>
  );
}

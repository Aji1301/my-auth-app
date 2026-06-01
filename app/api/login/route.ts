import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi koneksi ke Supabase menggunakan Environment Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validasi input dasar
        if (!email || !password) {
        return NextResponse.json(
            { message: 'Email dan password wajib diisi!' }, 
            { status: 400 }
        );
        }

        // Mengecek keaslian email dan password ke database Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        });

        // Jika email tidak ditemukan atau password salah
        if (error) {
        return NextResponse.json(
            { message: 'Email atau password yang Anda masukkan salah!' }, 
            { status: 401 }
        );
        }

        // Jika password benar dan login sukses
        return NextResponse.json(
        { 
            message: 'Login berhasil!', 
            user: data.user,
            session: data.session 
        }, 
        { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
        { message: 'Terjadi kesalahan pada server' }, 
        { status: 500 }
        );
    }
}
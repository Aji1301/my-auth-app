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

        // Mengirim data ke Supabase Auth untuk mendaftarkan user baru
        const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        });

        // Menangani pesan error dari Supabase
        if (error) {
        return NextResponse.json(
            { message: error.message }, 
            { status: 400 }
        );
        }

        // Jika registrasi berhasil
        return NextResponse.json(
        { 
            message: 'Registrasi berhasil! Silakan login dengan akun baru Anda.', 
            user: data.user 
        }, 
        { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
        { message: 'Terjadi kesalahan pada server' }, 
        { status: 500 }
        );
    }
}
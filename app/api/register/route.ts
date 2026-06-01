// File: app/api/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Menangkap inputan dari body request
        const body = await request.json();
        const { email, password } = body;

        // Validasi sederhana
        if (!email || !password) {
        return NextResponse.json(
            { message: 'Email dan password wajib diisi!' }, 
            { status: 400 }
        );
        }

        // Simulasi penyimpanan ke database dan autentikasi
        // Di sini logika database nyata (seperti Firebase/Supabase) biasanya diletakkan
        return NextResponse.json(
        { 
            message: 'Registrasi berhasil!', 
            user: { email } 
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
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Menangkap data dari frontend/Postman
        const body = await request.json();
        const { email, password } = body;

        // Validasi input
        if (!email || !password) {
        return NextResponse.json(
            { message: 'Email dan password wajib diisi!' }, 
            { status: 400 }
        );
        }

        // Simulasi autentikasi database (Anggap password minimal 6 karakter itu benar)
        if (password.length >= 6) {
        return NextResponse.json(
            { message: 'Login berhasil!', user: { email } }, 
            { status: 200 }
        );
        } else {
        return NextResponse.json(
            { message: 'Email atau password salah!' }, 
            { status: 401 }
        );
        }

    } catch (error) {
        return NextResponse.json(
        { message: 'Terjadi kesalahan pada server' }, 
        { status: 500 }
        );
    }
}
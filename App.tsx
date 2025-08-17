
import React, { useState, useEffect } from 'react';
import type { StudentData } from './types';
import FormField from './components/FormField';
import ImageUpload from './components/ImageUpload';
import IdCardPreview from './components/IdCardPreview';
import Template1 from './components/templates/Template1';

function App() {
  const [studentData, setStudentData] = useState<StudentData>({
    nim: '1234567890',
    universityName: 'Universitas Teknologi Digital',
    fullName: 'Jane Doe',
    alamat: 'Jl. Merdeka No. 10, Jakarta',
    major: 'Teknik Informatika',
    dob: '2002-01-01',
    validThru: '2026-01-01',
    email: 'jane.doe@utd.ac.id',
    universityLogo: null,
    studentPhoto: null,
    stamp: null,
    signature: null,
  });

  useEffect(() => {
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;700&family=Oswald:wght@700&family=Montserrat:wght@400;700&display=swap';
    
    // Ambil stylesheet font dan suntikkan ke dalam head dokumen.
    // Ini adalah solusi untuk masalah CORS di html-to-image di mana ia
    // tidak dapat membaca aturan CSS dari stylesheet lintas-asal.
    // Dengan mengambil dan menyisipkannya, kita menjadikannya stylesheet asal yang sama.
    fetch(fontUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(cssText => {
        const style = document.createElement('style');
        style.id = 'google-fonts-inline';
        style.textContent = cssText;
        document.head.appendChild(style);
      })
      .catch(error => {
        console.error('Failed to fetch and inline Google Fonts:', error);
      });

    // Bersihkan tag style yang disuntikkan saat komponen dilepas.
    return () => {
      const styleElement = document.getElementById('google-fonts-inline');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []); // Array dependensi kosong memastikan ini hanya berjalan sekali saat mount.

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (field: keyof StudentData, base64: string) => {
    setStudentData(prev => ({ ...prev, [field]: base64 }));
  };

  const templates = [
    { title: 'Desain Modern', component: Template1 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">ID Card Mahasiswa Generator</h1>
          <p className="text-gray-600 mt-2">Isi form di bawah untuk membuat kartu ID Anda.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg h-fit lg:sticky top-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Input Data</h2>
            <div className="space-y-4">
              <FormField label="NIM" id="nim" name="nim" value={studentData.nim} onChange={handleInputChange} placeholder="e.g., 1122334455" />
              <FormField label="Nama Universitas" id="universityName" name="universityName" value={studentData.universityName} onChange={handleInputChange} placeholder="e.g., Universitas Indonesia" />
              <FormField label="Nama Lengkap" id="fullName" name="fullName" value={studentData.fullName} onChange={handleInputChange} placeholder="e.g., Budi Hartono" />
              <FormField label="Alamat" id="alamat" name="alamat" value={studentData.alamat} onChange={handleInputChange} placeholder="e.g., Jl. Merdeka No. 10" />
              <FormField label="Jurusan" id="major" name="major" value={studentData.major} onChange={handleInputChange} placeholder="e.g., Ilmu Komputer" />
              <FormField label="Tanggal Lahir" id="dob" name="dob" value={studentData.dob} onChange={handleInputChange} type="date" />
              <FormField label="Berlaku Sampai" id="validThru" name="validThru" value={studentData.validThru} onChange={handleInputChange} type="date" />
              <FormField label="Email" id="email" name="email" value={studentData.email} onChange={handleInputChange} type="email" placeholder="e.g., budi@ui.ac.id" />

              <hr className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUpload label="Upload Logo Universitas" id="universityLogo" onImageUpload={(base64) => handleImageUpload('universityLogo', base64)} uploadedImage={studentData.universityLogo} />
                <ImageUpload label="Upload Foto Mahasiswa" id="studentPhoto" onImageUpload={(base64) => handleImageUpload('studentPhoto', base64)} uploadedImage={studentData.studentPhoto} />
                <ImageUpload label="Upload Stempel" id="stamp" onImageUpload={(base64) => handleImageUpload('stamp', base64)} uploadedImage={studentData.stamp} />
                <ImageUpload label="Upload Tanda Tangan" id="signature" onImageUpload={(base64) => handleImageUpload('signature', base64)} uploadedImage={studentData.signature} />
              </div>
            </div>
          </div>

          {/* Card Preview Section */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left">Pratinjau & Download Kartu</h2>
            <div className="flex justify-center lg:justify-start">
              {templates.map((template) => (
                <IdCardPreview key={template.title} title={template.title}>
                  <template.component data={studentData} />
                </IdCardPreview>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

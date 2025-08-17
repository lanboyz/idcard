
import React, { useState, useEffect } from 'react';
import type { StudentData } from './types';
import FormField from './components/FormField';
import ImageUpload from './components/ImageUpload';
import IdCardPreview from './components/IdCardPreview';
import Template1 from './components/templates/Template1';
import Template4 from './components/templates/Template4';

const MAJORS_LIST = [
  'Agribisnis',
  'Agroteknologi',
  'Akuntansi',
  'Antropologi Sosial',
  'Arsitektur',
  'Astronomi',
  'Bimbingan dan Konseling',
  'Biologi',
  'Bisnis Digital',
  'Desain Interior',
  'Desain Komunikasi Visual (DKV)',
  'Ekonomi Pembangunan',
  'Farmasi',
  'Filsafat',
  'Fisika',
  'Fisioterapi',
  'Fotografi',
  'Geofisika',
  'Gizi',
  'Hubungan Internasional',
  'Ilmu Ekonomi',
  'Ilmu Hukum',
  'Ilmu Keperawatan',
  'Ilmu Kesejahteraan Sosial',
  'Ilmu Komputer',
  'Ilmu Komunikasi',
  'Ilmu Politik',
  'Ilmu Tanah',
  'Kebidanan',
  'Kehutanan',
  'Kesehatan Masyarakat',
  'Kewirausahaan',
  'Kimia',
  'Manajemen',
  'Matematika',
  'Musik',
  'Pendidikan Bahasa Inggris',
  'Pendidikan Dokter',
  'Pendidikan Dokter Gigi',
  'Pendidikan Guru Sekolah Dasar (PGSD)',
  'Pendidikan Luar Biasa',
  'Pendidikan Matematika',
  'Peternakan',
  'Psikologi',
  'Sastra Indonesia',
  'Sastra Inggris',
  'Sastra Jepang',
  'Sejarah',
  'Seni Rupa Murni',
  'Sistem Informasi',
  'Sosiologi',
  'Statistika',
  'Teknik Elektro',
  'Teknik Industri',
  'Teknik Informatika',
  'Teknik Kimia',
  'Teknik Mesin',
  'Teknik Penerbangan',
  'Teknik Perkapalan',
  'Teknik Sipil',
  'Teknologi Pangan',
];

const UNIVERSITIES_LIST = [
  'Institut Pertanian Bogor (IPB)',
  'Institut Teknologi Bandung (ITB)',
  'Institut Teknologi Sepuluh Nopember (ITS)',
  'Telkom University',
  'Universitas Airlangga (UNAIR)',
  'Universitas Andalas (UNAND)',
  'Universitas Atma Jaya Yogyakarta (UAJY)',
  'Universitas Bina Nusantara (BINUS)',
  'Universitas Brawijaya (UB)',
  'Universitas Ciputra',
  'Universitas Dian Nuswantoro (UDINUS)',
  'Universitas Diponegoro (UNDIP)',
  'Universitas Gadjah Mada (UGM)',
  'Universitas Gunadarma',
  'Universitas Hasanuddin (UNHAS)',
  'Universitas Indonesia (UI)',
  'Universitas Islam Indonesia (UII)',
  'Universitas Islam Negeri (UIN) Sunan Ampel Surabaya',
  'Universitas Islam Negeri (UIN) Sunan Gunung Djati Bandung',
  'Universitas Islam Negeri (UIN) Syarif Hidayatullah Jakarta',
  'Universitas Jenderal Soedirman (UNSOED)',
  'Universitas Katolik Parahyangan (UNPAR)',
  'Universitas Komputer Indonesia (UNIKOM)',
  'Universitas Kristen Petra',
  'Universitas Lambung Mangkurat (ULM)',
  'Universitas Lampung (UNILA)',
  'Universitas Mercu Buana',
  'Universitas Muhammadiyah Malang (UMM)',
  'Universitas Muhammadiyah Surakarta (UMS)',
  'Universitas Muhammadiyah Yogyakarta (UMY)',
  'Universitas Mulawarman (UNMUL)',
  'Universitas Negeri Jakarta (UNJ)',
  'Universitas Negeri Makassar (UNM)',
  'Universitas Negeri Malang (UM)',
  'Universitas Negeri Medan (UNIMED)',
  'Universitas Negeri Padang (UNP)',
  'Universitas Negeri Semarang (UNNES)',
  'Universitas Negeri Surabaya (UNESA)',
  'Universitas Negeri Yogyakarta (UNY)',
  'Universitas Padjadjaran (UNPAD)',
  'Universitas Palangka Raya (UPR)',
  'Universitas Pancasila',
  'Universitas Pasundan (UNPAS)',
  'Universitas Pelita Harapan (UPH)',
  'Universitas Pendidikan Ganesha (UNDIKSHA)',
  'Universitas Pendidikan Indonesia (UPI)',
  'Universitas Riau (UNRI)',
  'Universitas Sam Ratulangi (UNSRAT)',
  'Universitas Sebelas Maret (UNS)',
  'Universitas Sriwijaya (UNSRI)',
  'Universitas Sumatera Utara (USU)',
  'Universitas Syiah Kuala (UNSYIAH)',
  'Universitas Tadulako (UNTAD)',
  'Universitas Tanjungpura (UNTAN)',
  'Universitas Tarumanagara (UNTAR)',
  'Universitas Terbuka (UT)',
  'Universitas Trisakti',
  'Universitas Udayana (UNUD)',
];

function App() {
  const [studentData, setStudentData] = useState<StudentData>({
    nim: '',
    universityName: '',
    fullName: '',
    alamat: '',
    major: '',
    dob: '',
    validThru: '',
    email: '',
    universityLogo: null,
    studentPhoto: null,
    stamp: null,
    signature: null,
  });

  useEffect(() => {
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;700&family=Oswald:wght@700&family=Montserrat:wght@400;700;900&display=swap';
    
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

    return () => {
      const styleElement = document.getElementById('google-fonts-inline');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (field: keyof StudentData, base64: string) => {
    setStudentData(prev => ({ ...prev, [field]: base64 }));
  };
  
  const formatDateID = (dateString: string): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    // If date is invalid (e.g., user is typing), return original string
    if (isNaN(date.getTime())) return dateString;
    
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    // Use UTC methods to prevent timezone issues from shifting the date
    // when parsing YYYY-MM-DD strings.
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const formattedStudentData = {
    ...studentData,
    dob: formatDateID(studentData.dob),
    validThru: formatDateID(studentData.validThru),
  };

  const templates = [
    { title: 'Desain Modern (Indigo)', component: Template1 },
    { title: 'Desain Dinamis (Indigo)', component: Template4 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">ID Card Mahasiswa Generator</h1>
          <p className="text-gray-600 mt-2">Isi form di bawah untuk membuat kartu ID Anda.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <section aria-labelledby="form-heading" className="lg:sticky lg:top-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <h2 id="form-heading" className="text-2xl font-semibold text-gray-800 mb-6">Input Data</h2>
              <div className="space-y-4">
                <FormField label="NIM" id="nim" name="nim" value={studentData.nim} onChange={handleInputChange} placeholder="e.g., 1122334455" />
                <FormField label="Nama Universitas" id="universityName" name="universityName" value={studentData.universityName} onChange={handleInputChange} placeholder="e.g., Universitas Indonesia" listId="universities-list" options={UNIVERSITIES_LIST} />
                <FormField label="Nama Lengkap" id="fullName" name="fullName" value={studentData.fullName} onChange={handleInputChange} placeholder="e.g., Budi Hartono" />
                <FormField label="Alamat" id="alamat" name="alamat" value={studentData.alamat} onChange={handleInputChange} placeholder="e.g., Jl. Merdeka No. 10" />
                <FormField label="Jurusan" id="major" name="major" value={studentData.major} onChange={handleInputChange} placeholder="e.g., Ilmu Komputer" listId="majors-list" options={MAJORS_LIST} />
                <FormField label="Tanggal Lahir" id="dob" name="dob" value={studentData.dob} onChange={handleInputChange} type="text" placeholder="e.g., 17 Agustus 2002" />
                <FormField label="Berlaku Sampai" id="validThru" name="validThru" value={studentData.validThru} onChange={handleInputChange} type="text" placeholder="e.g., 17 Agustus 2026" />
                <FormField label="Email" id="email" name="email" value={studentData.email} onChange={handleInputChange} type="email" placeholder="e.g., budi@ui.ac.id" />

                <hr className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUpload label="Upload Logo Universitas" id="universityLogo" onImageUpload={(base64) => handleImageUpload('universityLogo', base64)} uploadedImage={studentData.universityLogo} />
                  <ImageUpload label="Upload Foto Mahasiswa" id="studentPhoto" onImageUpload={(base64) => handleImageUpload('studentPhoto', base64)} uploadedImage={studentData.studentPhoto} />
                  <ImageUpload label="Upload Stempel" id="stamp" onImageUpload={(base64) => handleImageUpload('stamp', base64)} uploadedImage={studentData.stamp} />
                  <ImageUpload label="Upload Tanda Tangan" id="signature" onImageUpload={(base64) => handleImageUpload('signature', base64)} uploadedImage={studentData.signature} />
                </div>
              </div>
            </div>
          </section>

          {/* Card Preview Section */}
          <section aria-labelledby="preview-heading">
            <h2 id="preview-heading" className="text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left">Pratinjau & Download Kartu</h2>
            <div className="grid grid-cols-1 gap-8 place-items-center">
              {templates.map((template) => (
                <IdCardPreview key={template.title} title={template.title}>
                  <template.component data={formattedStudentData} />
                </IdCardPreview>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

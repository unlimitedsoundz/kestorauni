import StudentLifeContent from '@/components/student-life/StudentLifeContent';

export const metadata = {
    title: 'Student Life | Kestora University',
    description: 'Experience a supportive and vibrant campus environment. From coastal landscapes to modern academic facilities, discover how our community thrives in the heart of Helsinki.',
    alternates: {
        canonical: 'https://kestora.online/student-life/',
    },
};

export default function StudentLifePage() {
    return <StudentLifeContent />;
}

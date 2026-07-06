
import * as React from 'react';
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Img,
    Heading,
    Text,
    Link,
    Tailwind,
} from '@react-email/components';

interface HousingAssignedEmailProps {
    firstName: string;
    buildingName: string;
    roomNumber: string;
    roomType: string;
    startDate: string;
    monthlyRate: number;
}

export default function HousingAssignedEmail({
    firstName = 'Student',
    buildingName = 'Domus Academica',
    roomNumber = '101',
    roomType = 'Studio',
    startDate = '01.08.2026',
    monthlyRate = 600,
}: HousingAssignedEmailProps) {
    const previewText = `Your Housing at Kestora University has been Issued`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="my-[20px] mx-auto px-[15px] py-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Img
                                src="https://kestora.online/logo-kestora.png"
                                width="64"
                                height="64"
                                alt="Kestora University"
                                className="my-0 mx-auto"
                            />
                        </Section>

                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Housing Assignment Issued
                        </Heading>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Dear {firstName},
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            We are pleased to inform you that your housing application has been processed and a room has been officially assigned to you at Kestora University.
                        </Text>

                        <Section className="my-[20px] p-[20px] bg-neutral-50 rounded">
                            <Text className="text-black text-[14px] leading-[24px] my-1"><strong>Building:</strong> {buildingName}</Text>
                            <Text className="text-black text-[14px] leading-[24px] my-1"><strong>Room:</strong> #{roomNumber} ({roomType})</Text>
                            <Text className="text-black text-[14px] leading-[24px] my-1"><strong>Move-in Date:</strong> {startDate}</Text>
                            <Text className="text-black text-[14px] leading-[24px] my-1"><strong>Monthly Rent:</strong> €{monthlyRate}</Text>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            You can now view your full housing details, including lease agreements and arrival instructions, in your student portal.
                        </Text>

                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Link
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href="https://kestora.online/portal/student/housing"
                            >
                                View Housing Dashboard
                            </Link>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Please remember to bring your identity documents and your admission letter when you arrive to pick up your keys.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px] mt-[24px]">
                            Warm regards,
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Student Housing Office
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Kestora University
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

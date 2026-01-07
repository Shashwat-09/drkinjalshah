import { SITE_CONFIG } from "@/lib/site-config";

interface SchemaBuilderProps {
    type: "MedicalBusiness" | "Physician" | "Service";
    data?: any;
}

export function SchemaBuilder({ type, data }: SchemaBuilderProps) {
    let schemaData = {};

    if (type === "MedicalBusiness") {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": SITE_CONFIG.name,
            "image": `${SITE_CONFIG.url}/images/clinic-facade.jpg`,
            "@id": SITE_CONFIG.url,
            "url": SITE_CONFIG.url,
            "telephone": SITE_CONFIG.contact.phone,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": SITE_CONFIG.address.street,
                "addressLocality": SITE_CONFIG.address.city,
                "addressRegion": SITE_CONFIG.address.state,
                "postalCode": SITE_CONFIG.address.zip,
                "addressCountry": SITE_CONFIG.address.country,
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": SITE_CONFIG.geo.latitude,
                "longitude": SITE_CONFIG.geo.longitude,
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "10:00",
                    "closes": "20:00",
                },
            ],
            "priceRange": "₹₹",
        };
    }

    if (type === "Physician") {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": SITE_CONFIG.name,
            "url": `${SITE_CONFIG.url}/about`,
            "medicalSpecialty": "Clinical Psychologist",
            "description": "Dr. Kinjal Shah is a licensed clinical psychologist in Ahmedabad specializing in anxiety and depression therapy.",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": SITE_CONFIG.address.city,
                "addressRegion": SITE_CONFIG.address.state
            }
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}

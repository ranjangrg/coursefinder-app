import { DepartmentData } from "@/app/types/Department";
import { NextRequest, NextResponse } from "next/server";

const depts: DepartmentData[] = [
    {
        "id": "CS101",
        "title": "Computer Science Department",
        "desc": "Focuses on programming, algorithms, software development, and cybersecurity.",
        "imgUrl": "https://example.com/images/dept_cs.jpg"
    },
    {
        "id": "BIO101",
        "title": "Biology Department",
        "desc": "Explores the study of life, including genetics, ecology, and human physiology.",
        "imgUrl": "https://example.com/images/dept_bio.jpg"
    },
    {
        "id": "PHY201",
        "title": "Physics Department",
        "desc": "Investigates the fundamental laws of nature, from mechanics to quantum physics.",
        "imgUrl": "https://example.com/images/dept_phy.jpg"
    },
    {
        "id": "CHM101",
        "title": "Chemistry Department",
        "desc": "Covers the composition, structure, properties, and reactions of matter.",
        "imgUrl": "https://example.com/images/dept_chm.jpg"
    },
    {
        "id": "DS201",
        "title": "Data Science Department",
        "desc": "Dedicated to the analysis, interpretation, and visualization of large datasets.",
        "imgUrl": "https://example.com/images/dept_ds.jpg"
    },
    {
        "id": "GD301",
        "title": "Graphic Design Department",
        "desc": "Offers courses in visual communication, UI/UX, and digital media creation.",
        "imgUrl": "https://example.com/images/dept_gd.jpg"
    },
    {
        "id": "AC601",
        "title": "Accounting Department",
        "desc": "Provides education in financial reporting, auditing, and tax principles.",
        "imgUrl": "https://example.com/images/dept_ac.jpg"
    },
    {
        "id": "EN801",
        "title": "English Department",
        "desc": "Fosters skills in literature, rhetoric, and various forms of creative writing.",
        "imgUrl": "https://example.com/images/dept_en.jpg"
    }
];

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const deptId = searchParams.get("id");
    if (deptId) {
        const deptData = depts.find((c) => (c.id === deptId));
        if (deptData) {
            return NextResponse.json(deptData);
        } else {
            return new NextResponse(`Department with id: ${deptId} not found`, { status: 404 });
        }
    } else {
        return NextResponse.json(depts);
    }
}   
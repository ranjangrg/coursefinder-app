import { CourseData } from "@/app/types/Course";
import { NextRequest, NextResponse } from "next/server";
import { start } from "repl";

const courses: CourseData[] = [
    {
        "id": "1",
        "title": "Introduction to Python Programming",
        "desc": "Learn the fundamentals of Python, from basic syntax to object-oriented concepts.",
        "deptId": "CS101",
        "imgUrl": "https://example.com/images/python.jpg"
    },
    {
        "id": "2",
        "title": "General Biology: Principles and Applications",
        "desc": "An introduction to the fundamental principles of biology, including cell structure, genetics, and evolution.",
        "deptId": "BIO101",
        "imgUrl": "https://example.com/images/biology.jpg"
    },
    {
        "id": "3",
        "title": "Introductory Physics I: Mechanics",
        "desc": "A foundational course covering classical mechanics, including motion, forces, energy, and momentum.",
        "deptId": "PHY201",
        "imgUrl": "https://example.com/images/physics.jpg"
    },
    {
        "id": "4",
        "title": "General Chemistry I",
        "desc": "Explore the fundamental principles of chemistry, including atomic structure, chemical bonding, and reactions.",
        "deptId": "CHM101",
        "imgUrl": "https://example.com/images/chemistry.jpg"
    },
    {
        "id": "5",
        "title": "Data Science and Machine Learning",
        "desc": "Explore data analysis, visualization, and machine learning algorithms.",
        "deptId": "DS201",
        "imgUrl": "https://example.com/images/datascience.jpg"
    },
    {
        "id": "6",
        "title": "Principles of UI/UX Design",
        "desc": "Understand the core principles of user interface and user experience design.",
        "deptId": "GD301",
        "imgUrl": "https://example.com/images/uiux.jpg"
    },
    {
        "id": "7",
        "title": "Web Development with JavaScript",
        "desc": "Master modern web development using HTML, CSS, and JavaScript frameworks.",
        "deptId": "CS102",
        "imgUrl": "https://example.com/images/javascript.jpg"
    },
    {
        "id": "8",
        "title": "Advanced C++ for Game Development",
        "desc": "Dive into advanced C++ topics relevant for building high-performance games.",
        "deptId": "CS203",
        "imgUrl": "https://example.com/images/cpp.jpg"
    },
    {
        "id": "9",
        "title": "Introduction to Cybersecurity",
        "desc": "Cover the basics of cybersecurity, including network security and ethical hacking.",
        "deptId": "CS305",
        "imgUrl": "https://example.com/images/cybersecurity.jpg"
    },
    {
        "id": "10",
        "title": "Graphic Design with Adobe Suite",
        "desc": "A practical guide to using Adobe Photoshop, Illustrator, and InDesign.",
        "deptId": "GD102",
        "imgUrl": "https://example.com/images/adobe.jpg"
    },
    {
        "id": "11",
        "title": "Financial Accounting Basics",
        "desc": "Get an overview of financial accounting principles and practices.",
        "deptId": "AC601",
        "imgUrl": "https://example.com/images/accounting.jpg"
    },
    {
        "id": "12",
        "title": "Creative Writing Workshop",
        "desc": "Explore techniques for writing fiction, non-fiction, and poetry.",
        "deptId": "EN801",
        "imgUrl": "https://example.com/images/writing.jpg"
    }
];

export async function GET(request: NextRequest) {
    // get course by id
    const searchParams = request.nextUrl.searchParams;
    const courseId = searchParams.get("id");
    if (courseId) {
        const courseData = courses.find((c) => (c.id === courseId));
        if (courseData) {
            return NextResponse.json(courseData);
        } else {
            return new NextResponse(`Course with id: ${courseId} not found`, { status: 404 });
        }
    }

    // basic course search; only uses "name" property
    let searchTerm = searchParams.get("search");
    if (searchTerm) {
        let filteredCourses = courses;
        searchTerm = searchTerm!.toLowerCase();
        filteredCourses = courses.filter((course: CourseData) =>
            course.title.toLowerCase().includes(searchTerm!)
        );
        return NextResponse.json( filteredCourses );
    }

    let _pageIdx = searchParams.get("page");
    if (_pageIdx) {
        // get paginated courses list
        const totalCount = courses.length;  // make sure courses list is not null or empty
        const pageIdx = parseInt(_pageIdx!, 10);
        let pageSize = 5; // default pageSize
        const _pageSize = searchParams.get("pageSize");
        if (_pageSize) {
            pageSize = parseInt(_pageSize!, 10);
        }
        const pageCount = Math.ceil(totalCount / pageSize);
        const startIdx = (pageIdx - 1) * pageSize;
        if ((startIdx < 0) || (startIdx >= totalCount)) {
            return new NextResponse(`Invalid page provided`, { status: 404 })
        }
        const endIdx = Math.min(startIdx + pageSize, totalCount);
        const filteredCourses = courses.slice(startIdx, endIdx);
        return NextResponse.json( filteredCourses );
    }

    // return ALL courses
    return NextResponse.json(courses);
}
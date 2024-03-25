export const FORUMS_PER_PAGE = 6;

export const LOS_PER_PAGE = 9;

export const PERCENTAGE_TO_PASS_LO = 80;

// Background Knowledge
export const BACKGROUND_KNOWLEDGE_BASIC = "BASIC";
export const BACKGROUND_KNOWLEDGE_INTERMEDIATE = "INTERMEDIATE";
export const BACKGROUND_KNOWLEDGE_EXPERT = "EXPERT";

// Qualification
export const QUALIFICATION_HIGHSCHOOL = "HIGHSCHOOL";
export const QUALIFICATION_GRADUATE = "GRADUATE";
export const QUALIFICATION_UNDERGRADUATE = "UNDERGRADUATE";

// Learner Goal
export const LEARNER_GOAL_FUNDAMENTALS =  "FUNDAMENTALS";
export const LEARNER_GOAL_DEEP_LEARNING = "DEEP_LEARNING";
export const LEARNER_GOAL_MACHINE_LEARNING = "MACHINE_LEARNING";
export const LEARNER_GOAL_DATA_SCIENCE = "DATA_SCIENCE";
export const LEARNER_GOAL_DATA_ENGINEER = "DATA_ENGINEER";
export const LEARNER_GOAL_BIG_DATA_ENGINEER = "BIG_DATA_ENGINEER";

// Base Info Test
export const BASE_INFO_QUES = [
    {
        question: "Trình độ học vấn của bạn hiện tại",
        options: [
            {
                label: "Phổ thông",
                value: QUALIFICATION_HIGHSCHOOL
            },
            {
                label: "Đang học đại học",
                value: QUALIFICATION_UNDERGRADUATE
            },
            {
                label: "Đã tốt nghiệp đại học",
                value: QUALIFICATION_GRADUATE
            }
        ]
    },
    {
        question: "Đánh giá kiến thức hiện tại của bạn về AI",
        options: [
            {
                label: "Mới bắt đầu",
                value: BACKGROUND_KNOWLEDGE_BASIC
            },
            {
                label: "Trình độ trung cấp",
                value: BACKGROUND_KNOWLEDGE_INTERMEDIATE
            },
            {
                label: "Chuyên gia",
                value: BACKGROUND_KNOWLEDGE_EXPERT
            }
        ]
    },
    {
        question: "Bạn hiểu một thứ rõ ràng hơn sau khi",
        options: [
            {
                label: "thử qua nó",
                value: 'a'
            },
            {
                label: "suy nghĩ về nó",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn thích được xem là",
        options: [
            {
                label: "thực tế",
                value: 'a'
            },
            {
                label: "mơ mộng",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi nghĩ về ngày hôm qua, bạn thường tưởng tượng ra",
        options: [
            {
                label: "một bức ảnh",
                value: 'a'
            },
            {
                label: "những từ ngữ",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn có xu hướng",
        options: [
            {
                label: "hiểu về chi tiết nhưng có thể mơ hồ về kiến trúc tổng thể",
                value: 'a'
            },
            {
                label: "hiểu về kiến trúc tổng thể nhưng có thể mơ hồ về chi tiết",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi bạn học một thứ gì đó mới, thứ đó giúp bạn",
        options: [
            {
                label: "nói về nó",
                value: 'a'
            },
            {
                label: "suy nghĩ về nó",
                value: 'b'
            }
        ]
    },
    {
        question: "Nếu bạn là giáo viên, bạn sẽ thích dạy một khóa học",
        options: [
            {
                label: "hướng đến các sự kiện và tình huống thực tế",
                value: 'a'
            },
            {
                label: "hướng đến các ý tưởng và giả định",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn muốn tiếp nhận thông tin mới qua",
        options: [
            {
                label: "hình ảnh, biểu đồ, đồ thị hoặc sơ đồ",
                value: 'a'
            },
            {
                label: "hướng dẫn bằng văn bản hoặc thông tin nói",
                value: 'b'
            }
        ]
    },
    {
        question: "Một khi bạn đã hiểu",
        options: [
            {
                label: "tất cả thành phần, bạn sẽ hiểu toàn bộ vấn đề",
                value: 'a'
            },
            {
                label: "toàn bộ vấn đề, bạn sẽ hiểu cách các thành phần cấu thành vấn đề",
                value: 'b'
            }
        ]
    },
    {
        question: "Trong một nhóm đang bàn về vấn đề khó, bạn thường",
        options: [
            {
                label: "nhảy vào góp ý tưởng ngay",
                value: 'a'
            },
            {
                label: "ngồi lại lắng nghe",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn thấy dễ hơn khi",
        options: [
            {
                label: "học các sự kiện thực tế",
                value: 'a'
            },
            {
                label: "học các khái niệm",
                value: 'b'
            }
        ]
    },
    {
        question: "Trong một cuốn sách có rất nhiều hình ảnh và biểu đồ, bạn thường",
        options: [
            {
                label: "Quan sát kĩ các hình ảnh và biểu đồ",
                value: 'a'
            },
            {
                label: "Tập trung vào phần văn bản",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi giải toán",
        options: [
            {
                label: "bạn thường đi từng bước một đến lời giải",
                value: 'a'
            },
            {
                label: "nghĩ ra lời giải và sau đó phải vật lộn để tìm ra các bước để đạt được nó",
                value: 'b'
            }
        ]
    },
    {
        question: "Trong các lớp bạn đã từng học",
        options: [
            {
                label: "bạn thường quen với nhiều học sinh khác",
                value: 'a'
            },
            {
                label: "hiếm khi bạn làm quen với học sinh khác",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi đọc sách phi hư cấu, bạn thích",
        options: [
            {
                label: "thứ có thể dạy bạn các sự kiện thực tế mới hoặc chỉ bạn cách làm một điều gì đó",
                value: 'a'
            },
            {
                label: "thứ có thể cho bạn các ý tưởng mới để suy nghĩ về chúng",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn thích các giáo viên",
        options: [
            {
                label: "trình chiếu nhiều lược đồ trên bảng",
                value: 'a'
            },
            {
                label: "tập trung nhiều thời gian cho việc giải thích",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi bạn phân tích một câu chuyện hoặc tiểu thuyết",
        options: [
            {
                label: "bạn nghĩ về các sự kiện và cố gắng kết hợp chúng để tìm ra các chủ đề",
                value: 'a'
            },
            {
                label: "Bạn chỉ biết các chủ đề sau khi đọc xong, sau đó bạn phải quay lại và tìm ra các sự kiện chứng minh chúng",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi bạn đi vào giải một vấn đề",
        options: [
            {
                label: "bạn ngay lập tức đi vào tìm lời giải",
                value: 'a'
            },
            {
                label: "bạn cố gắng hiểu toàn bộ vấn đề trước",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn thích ý tưởng của",
        options: [
            {
                label: "trên sự chắc chắn",
                value: 'a'
            },
            {
                label: "trên lý thuyết",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn nhớ tốt nhất ",
        options: [
            {
                label: "những thứ bạn thấy",
                value: 'a'
            },
            {
                label: "những thứ bạn nghe",
                value: 'b'
            }
        ]
    },
    {
        question: "Với bạn, điều quan trọng hơn là người hướng dẫn của bạn",
        options: [
            {
                label: "trình bày nội dung theo các bước rõ ràng và tuần tự",
                value: 'a'
            },
            {
                label: "đưa ra bức tranh tổng thể và liên kết nội dung với các môn học khác",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn muốn học",
        options: [
            {
                label: "trong nhóm học tập",
                value: 'a'
            },
            {
                label: "một mình",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn thường được nhận định là",
        options: [
            {
                label: "người cầu toàn",
                value: 'a'
            },
            {
                label: "người làm việc sáng tạo",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi bạn được chỉ đường đến một địa điểm mới, bạn muốn có",
        options: [
            {
                label: "bản đồ",
                value: 'a'
            },
            {
                label: "hướng dẫn bằng văn bản",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn có quá trình học",
        options: [
            {
                label: "\"khá bình thường\". Nếu bạn học chăm chỉ, bạn sẽ hiểu được",
                value: 'a'
            },
            {
                label: "\"hơi bất ổn\". Bạn thường sẽ hoàn toàn bị bối rối và đột nhiên mọi thứ trở nên rõ ràng",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn thường sẽ",
        options: [
            {
                label: "thử làm trước",
                value: 'a'
            },
            {
                label: "nghĩ làm sao để làm",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi bạn đọc để giải trí, bạn muốn tác giả",
        options: [
            {
                label: "trình bày ý của mình rõ ràng ",
                value: 'trình bày mọi thứ một cách sáng tạo và thú vị'
            },
            {
                label: "Trình độ trung cấp",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi bạn nhìn thấy một biểu đồ hoặc bản vẽ trong lớp học, bạn thường nhớ",
        options: [
            {
                label: "bức hình",
                value: 'a'
            },
            {
                label: "những gì giáo viên nói về nó",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi đọc về một mẩu thông tin, bạn thường",
        options: [
            {
                label: "tập trung vào chi tiết và bỏ qua bức tranh lớn hơn",
                value: 'a'
            },
            {
                label: "Cố gắng hiểu bức tranh lớn trước khi đi vào chi tiết",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn dễ nhớ",
        options: [
            {
                label: "thứ bạn đã làm",
                value: 'a'
            },
            {
                label: "thứ bạn đã nghĩ rất nhiều về nó",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi bạn phải thực hiện một tác vụ, bạn thích",
        options: [
            {
                label: "thành thạo một cách làm nó",
                value: 'a'
            },
            {
                label: "thử các cách làm mới",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi người khác trình bày dữ liệu cho bạn, bạn thích",
        options: [
            {
                label: "biểu đồ hoặc đồ thị",
                value: 'a'
            },
            {
                label: "Văn bản tóm tắt kết quả",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi viết văn bản, bạn thường",
        options: [
            {
                label: "nghĩ và viết phần đầu và các phần tiếp theo",
                value: 'a'
            },
            {
                label: "nghĩ và viết các phần khác nhau sau đó sắp xếp chúng lại",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi bạn phải làm trong dự án nhóm, việc đầu tiên bạn muốn là",
        options: [
            {
                label: "nhóm họp bàn ý tưởng chung và mọi người đóng góp ý kiến",
                value: 'a'
            },
            {
                label: "cá nhân mỗi người tự lên ý tưởng rồi sau đó họp lại để so sánh các ý tưởng",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn nghĩ sẽ là lời khen cao hơn khi đánh giá một người là",
        options: [
            {
                label: "hợp lý",
                value: 'a'
            },
            {
                label: "sáng tạo",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi gặp mọi người ở buổi tiệc, bạn thường sẽ nhớ",
        options: [
            {
                label: "họ nhìn như thế nào",
                value: 'a'
            },
            {
                label: "những gì họ nói về bản thân",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi học một môn học mới, bạn thích",
        options: [
            {
                label: "giữ tập trung vào môn học, cố học càng nhiều về nó càng tốt",
                value: 'a'
            },
            {
                label: "cố tìm ra các liên kết giữa môn học này và các môn học khác",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn thường được nhận định là",
        options: [
            {
                label: "hướng ngoại",
                value: 'a'
            },
            {
                label: "hướng nội",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn thích các khóa học nhấn mạn vào",
        options: [
            {
                label: "các sự kiện thực tế, dữ liệu",
                value: 'a'
            },
            {
                label: "khái niệm, lý thuyết",
                value: 'b'
            }
        ]
    },
    {
        question: "Để giải trí, bạn sẽ",
        options: [
            {
                label: "xem TV",
                value: 'a'
            },
            {
                label: "đọc sách",
                value: 'b'
            }
        ]
    },
    {
        question: "Một số giáo viên bắt đầu bài giảng với phần khái quát những nội dung họ sẽ trình bày. Phần khái quát đó",
        options: [
            {
                label: "phần nào có ích với bạn",
                value: 'a'
            },
            {
                label: "rất có ích với bạn",
                value: 'b'
            }
        ]
    },
    {
        question: "Ý tưởng làm bài tập nhóm với điểm số chung cho cả nhóm",
        options: [
            {
                label: "hấp dẫn với bạn",
                value: 'a'
            },
            {
                label: "không hấp dẫn với bạn",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi đang thực hiện tính toán",
        options: [
            {
                label: "bạn thường có xu hướng lặp lại các bước và kiểm tra cẩn thận",
                value: 'a'
            },
            {
                label: "bạn cảm thấy việc kiểm tra là mệt mỏi và thường phải ép bản thân làm điều đó",
                value: 'b'
            }
        ]
    },
    {
        question: "Bạn có xu hướng tưởng tượng ra những nơi bạn đã đến",
        options: [
            {
                label: "một cách dễ dàng và khá chính xác",
                value: 'a'
            },
            {
                label: "một cách khó khăn và thiếu chi tiết",
                value: 'b'
            }
        ]
    },
    {
        question: "Khi giải quyết vấn đề trong nhóm, bạn thường",
        options: [
            {
                label: "nghĩ về các bước giải quyết",
                value: 'a'
            },
            {
                label: "nghĩ về các hậu quả hoặc ứng dụng có thể của giải pháp trong một loạt các lĩnh vực",
                value: 'b'
            }
        ]
    },
]
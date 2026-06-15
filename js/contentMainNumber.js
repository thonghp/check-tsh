const so2 = {
    "tu-khoa": "Từ khoá: Thích nghi, Tự tin, Quyết đoán, Linh hoạt. Dễ thích nghi dễ thay đổi, vui vẻ tích cực, thích trải nghiệm khó độc lạ",
    "nang-luc": "Năng lực: phù hợp với tất cả nghề vì như cá trê",
    "thach-thuc": "Thách thức: dễ nổi nóng, sống hời hợt",
    "bai-hoc": "Bài học: học cách kiên nhẫn, không được mất tinh thần"
}

const so4 = {
    "tu-khoa": "Thực tế, Kỷ luật, Hệ thống, Tỉ mỉ. Thích thực tế hơn lý thuyết, chỉnh chu chi tiết, kiên nhẫn, Thích trải nghiệm về thể chất (ca hát, thể thao), làm việc gì cũng giỏi. Ít khi ngồi yên, hay chạy lại hỏi người khác có cần giúp gì không",
    "nang-luc": "Năng lực: Kỹ thuật, Xây dựng, Kế toán, Quản trị vận hành, Vận động viên, các nghề đòi hỏi chính xác cao",
    "thach-thuc": "Thách thức: Dễ trở nên bảo thủ, khó thích nghi với sự thay đổi, Dễ bị công việc lôi cuốn đi và quá chú trọng vào việc tích lũy vật chất",
    "bai-hoc": "Bài học: tập trung luyện trí, cân bằng vật chất và tinh thần, mở rộng tầm nhìn thay vì chỉ tập trung vào chi tiết vụn vặt"
}

const mainNumber = {
    2: so2,
    4: so4
}

const getContentMainNumber = mainNum => {
    return mainNumber[mainNum] 
}

export { getContentMainNumber }
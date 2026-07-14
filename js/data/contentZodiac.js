const axesData = {
  "Trí não": {
    signs: ["Bạch Dương", "Kim Ngưu", "Song Tử", "Cự Giải"],
    desc: "Thuộc trục 3-6-9, thiên về trí tuệ, suy nghĩ và tư duy logic."
  },
  "Tâm hồn": {
    signs: ["Sư Tử", "Xử Nữ", "Thiên Bình", "Bọ Cạp"],
    desc: "Thuộc trục 2-5-8, bị chi phối nhiều bởi cảm xúc, rung động và khả năng cảm nhận sâu sắc."
  },
  "Thể chất": {
    signs: ["Nhân Mã", "Ma Kết", "Bảo Bình", "Song Ngư"],
    desc: "Thuộc trục 1-4-7, mang tính thực tế cao, luôn hướng tới hành động và trải nghiệm vật chất."
  }
};

const elementsData = {
  "Lửa": {
    color: "#ef4444", bg: "#fef2f2",
    desc: "Là những người năng động, bốc đồng và đam mê, cần học cách yêu thương và hỗ trợ người khác."
  },
  "Đất": {
    color: "#d97706", bg: "#fffbeb",
    desc: "Đáng tin cậy, ổn định và nhất quán, nâng cao nhận thức tâm linh thông qua việc phục vụ người khác."
  },
  "Khí": {
    color: "#0ea5e9", bg: "#f0f9ff",
    desc: "Linh hoạt, trí não nhạy bén, suy nghĩ đa chiều nhưng dễ kiệt sức thần kinh, cần thấu hiểu và kết nối với mọi người."
  },
  "Nước": {
    color: "#3b82f6", bg: "#eff6ff",
    desc: "Yêu hòa bình, tính cách an tĩnh, có khả năng chữa lành, cần duy trì sự cân bằng và tránh mất kiểm soát cảm xúc."
  }
};

const zodiacData = {
  "Bạch Dương": { element: "Lửa", axis: "Trí não", icon: "♈", date: "21/3 - 20/4",
    bieu_dat: "Não bộ hoạt động cực mạnh, dũng cảm, dí dỏm, luôn muốn học hỏi.",
    tieu_cuc: "Thiếu kiên nhẫn, dễ bốc đồng, ăn nói sắc mỏng và dễ nổi nóng nếu mất kiểm soát."
  },
  "Kim Ngưu": { element: "Đất", axis: "Trí não", icon: "♉", date: "21/4 - 20/5",
    bieu_dat: "Kiên định, mạnh mẽ, cực kỳ đáng tin cậy. Họ thích hành động hơn là nghĩ, yêu sự thoải mái và đồ ăn ngon.",
    tieu_cuc: "Dễ trở nên bướng bỉnh, hành động bốc đồng theo dục vọng và nuông chiều bản thân thái quá."
  },
  "Song Tử": { element: "Khí", axis: "Trí não", icon: "♊", date: "21/5 - 20/6",
    bieu_dat: "Tồn tại hai tính cách (bản ngã và vỏ bọc xã hội). Rất nhạy bén, khả năng phân biệt thật giả tốt, giao tiếp giỏi (nhất là qua viết lách).",
    tieu_cuc: "Dễ bị bối rối giữa hai tính cách, thiếu tập trung, bồn chồn."
  },
  "Cự Giải": { element: "Nước", axis: "Trí não", icon: "♋", date: "21/6 - 21/7",
    bieu_dat: "Nhạy cảm, thận trọng, vô cùng yêu gia đình và bảo vệ tổ ấm. Trí nhớ cực tốt và là những người chữa lành bẩm sinh.",
    tieu_cuc: "Dễ trở thành nạn nhân của cảm xúc (ủ rũ, lo âu, sợ mất an toàn tài chính) dẫn đến mệt mỏi."
  },
  "Sư Tử": { element: "Lửa", axis: "Tâm hồn", icon: "♌", date: "22/7 - 22/8",
    bieu_dat: "Sinh ra để lãnh đạo, dồi dào năng lượng, vô cùng tự tin, căm ghét việc làm dưới quyền người khác.",
    tieu_cuc: "Đôi khi quá cảm xúc, nóng giận làm cạn kiệt năng lượng thần kinh và gây áp lực khổng lồ lên tim."
  },
  "Xử Nữ": { element: "Đất", axis: "Tâm hồn", icon: "♍", date: "23/8 - 22/9",
    bieu_dat: "Người theo đuổi sự hoàn hảo, xuất sắc trong phân tích, đòi hỏi sự chính xác. Thích giúp đỡ người khác cải thiện cuộc sống.",
    tieu_cuc: "Dễ mắc rối loạn lo âu bệnh tật (hypochondriacal), lo lắng thái quá về sức khỏe gây trầm cảm nhẹ, làm mất năng lực chữa lành bẩm sinh."
  },
  "Thiên Bình": { element: "Khí", axis: "Tâm hồn", icon: "♎", date: "23/9 - 22/10",
    bieu_dat: "Yêu chuộng hòa bình, sự cân bằng và dịu dàng. Cực kỳ ghét đạo đức giả và bạo lực. Là người thẳng thắn bảo vệ công lý.",
    tieu_cuc: "Khi mất cân bằng hóa học trong cơ thể, họ đột nhiên trở nên nóng nảy, liều lĩnh hoặc thậm chí có ý định tự tử."
  },
  "Bọ Cạp": { element: "Nước", axis: "Tâm hồn", icon: "♏", date: "23/10 - 22/11",
    bieu_dat: "Liên quan đến vùng nhạy cảm nhất (cơ quan sinh sản). Có sự quyết tâm khổng lồ, giữ bí mật tốt, kỹ năng đôi tay xuất sắc nên làm bác sĩ phẫu thuật/người chữa lành rất giỏi.",
    tieu_cuc: "Khi chưa trưởng thành dễ trở nên cay nghiệt, tàn nhẫn và thất thường. Lạm dụng tình dục sẽ làm cạn kiệt năng lượng thần kinh (đặc biệt là dây thần kinh tọa)."
  },
  "Nhân Mã": { element: "Lửa", axis: "Thể chất", icon: "♐", date: "23/11 - 22/12",
    bieu_dat: "Vui vẻ, quảng giao, vô cùng yêu tự do và thích vận động (chạy rất nhanh). Yêu triết học, có năng lực tiên tri/ngoại cảm bẩm sinh.",
    tieu_cuc: "Quá khao khát thay đổi dẫn đến làm việc thiếu tập trung, thiếu chính xác, dễ chuyển từ hưng phấn sang tuyệt vọng."
  },
  "Ma Kết": { element: "Đất", axis: "Thể chất", icon: "♑", date: "23/12 - 21/1",
    bieu_dat: "Thận trọng, thực tế, luôn tuân thủ luật lệ và quy ước xã hội. Cực kỳ tôn trọng an toàn vật chất, trí nhớ tốt, thích sự tĩnh lặng.",
    tieu_cuc: "Chủ nghĩa vật chất quá mạnh, gặp khó khăn/khủng hoảng khi các giá trị cũ bị phá vỡ trong Kỷ nguyên mới (Aquarian age)."
  },
  "Bảo Bình": { element: "Khí", axis: "Thể chất", icon: "♒", date: "22/1 - 20/2",
    bieu_dat: "Là những người mở đường cho Kỷ nguyên mới. Yêu sự thật, ghét đạo đức giả, thích nghiên cứu khoa học, triết học và tôn giáo so sánh.",
    tieu_cuc: "Phản ứng quá gay gắt với sự đạo đức giả. Hệ thần kinh nhạy cảm dễ gây căng thẳng, đau đầu, trầm cảm và mệt mỏi liên tục."
  },
  "Song Ngư": { element: "Nước", axis: "Thể chất", icon: "♓", date: "21/2 - 20/3",
    bieu_dat: "Cực kỳ tốt bụng, nhạy cảm, trung thành và hào phóng. Là những người chữa lành bẩm sinh (bằng năng lượng từ trường qua đôi tay).",
    tieu_cuc: "Dễ bị lợi dụng vì quá tốt bụng. Lo âu thái quá cho người khác khiến họ kiệt sức, dễ tìm đến ma túy, rượu hoặc thậm chí suy sụp tinh thần nếu không biết bảo vệ bản thân."
  }
};

export { axesData, elementsData, zodiacData };
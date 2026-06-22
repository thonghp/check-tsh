const so1 = {
  1: "Gặp khó khăn trong việc diễn đạt cảm xúc bằng lời nói. Nội tâm có thể rất phong phú nhưng khi nói ra lại không hết ý hoặc dễ gây hiểu lầm",
  2: "Diễn đạt tốt, nhìn nhận vấn đề đa chiều và biết cách bảo vệ quan điểm cá nhân",
  3: "Có hai xu hướng (lúc vui lúc buồn), hoặc nói rất nhiều (đôi khi nói hớ), hoặc im lặng tuyệt đối nhưng bên trong nội tâm dậy sóng (thường trống 456)",
  4: "Dễ gặp áp lực về mặt cảm xúc, tâm lý nhạy cảm, cực kỳ khó giao tiếp, dễ bị hiểu lầm và đôi khi cảm thấy bị cô lập trong chính suy nghĩ của mình. Suy nghĩ thận trọng trước khi phát biểu, phản ứng chậm lại với ý kiến trái chiều",
};

const so2 = {
  1: "Mức độ trực giác cơ bản, đủ để nhận diện cảm xúc (đối với đàn ông thì 1 con số 2 thường nam tính mạnh còn 2 con số 2 là đẹp nhất)",
  2: "Trực giác rất nhạy bén, khả năng đọc vị người khác tốt, tâm trí minh mẫn.",
  3: "Quá nhạy cảm. dễ bị ảnh hưởng bởi năng lượng tiêu cực của người khác, dễ xúc động mạnh và đôi khi thiếu thực tế.",
  4: "Thiếu kiên nhẫn, nhạy cảm thái quá, dễ bị kích động, rất cô đơn, mượn rượu chè, chất kích thích để cho qua ngày",
};

const so3 = {
  1: "Trí nhớ tốt, óc hài hước, nhanh nhạy, sống tích cực linh hoạt, ham học hỏi",
  2: "Trí tưởng tượng phong phú, khả năng viết lách tốt nhưng cần tránh việc soi xét, phê bình người khác quá mức (ai hay lên mạng chửi do bực mình hay mất công).",
  3: "Tâm trí quá năng động dẫn đến khó tập trung, dễ mất kết nối với thực tế, khó cảm thấy hạnh phúc.",
};

const so4 = {
  1: "Thích làm việc thực tế, không tin những cái trừu tượng, thích làm việc ngay lập tức không thích hẹn, ngăn nắp, thực dụng, giỏi các công việc chân tay hoặc kỹ thuật.",
  2: "Quá chú trọng vào tiểu tiết, vật chất. cần học cách linh hoạt để không trở nên cứng nhắc.",
  3: "Áp lực lao vào kiếm tiền, làm việc cực nhọc liên tục, sa đà vào vật chất, cực kỳ bảo thủ, dễ bị yếu 2 cái chân",
};

const so5 = {
  1: "Có sự cân bằng cảm xúc, thích tự do và có nhu cầu kết nối cao.",
  2: "Cảm xúc mạnh mẽ, khó kiềm chế, thích mạo hiểm và đôi khi thiếu kiên trì.",
  3: "Cảm xúc cực kỳ mãnh liệt và dễ thay đổi thất thường. Sự tự do quá mức có thể khiến bạn khó tập trung vào một mục tiêu cố định hoặc dễ rơi vào trạng thái nổi loạn.",
};

const so6 = {
  1: "Có trách nhiệm với gia đình, sáng tạo tốt, có máu nghệ thuật hoặc thích cái đẹp.",
  2: "Cầu toàn quá mức (khó tính ưa ngọt), dễ bị căng thẳng (stress) nếu mọi việc không theo ý mình, cần học cách bao dung",
  3: "Thường xuyên lo lắng thái quá cho người thân, dễ biến tình yêu thành sự kiểm soát.",
};

const so7 = {
  1: "Có thể mất mát 1 trong 3 cái (tiền bạc, sưc khoẻ, tình cảm), học hỏi thông qua sự mất mát để trưởng thành.",
  2: "Có thể mất mát 2 trong 3 cái (tiền bạc, sưc khoẻ, tình cảm), cuộc đời thường trải qua nhiều thăng trầm lớn",
};

const so8 = {
  1: "Ngăn nắp, tỉ mỉ, độc lập, có khả năng quản lý tài chính và cảm xúc.",
  2: "Cực kỳ độc lập và cá tính mạnh, nhạy bén trong việc đánh giá vấn đề nhưng đôi khi dễ trở nên bướng bỉnh hoặc có xu hướng phê bình người khác quá khắt khe",
  3: "Cảm thấy khó hòa nhập vì tiêu chuẩn cá nhân quá cao hoặc quá tin vào nhận định của mình, nếu không biết kiểm soát dễ trở nên lạnh lùng hoặc xa cách (ko muốn ra đường).",
};

const so9 = {
  1: "Có lý tưởng, có trách nhiệm cá nhân ở mức tốt.",
  2: "Hoài bão lớn, lý tưởng cao cả. Tuy nhiên, nếu không có các số thực tế (1, 4, 7), dễ trở thành người mơ mộng suông.",
  3: "Tham vọng - lý tưởng quá lớn nên rất khổ tâm",
};

const mainNumber = {
  1: so1,
  2: so2,
  3: so3,
  4: so4,
  5: so5,
  6: so6,
  7: so7,
  8: so8,
  9: so9,
};

const getContentOccurrenceNumber = (mainNum) => {
  return mainNumber[mainNum];
};

export { getContentOccurrenceNumber };

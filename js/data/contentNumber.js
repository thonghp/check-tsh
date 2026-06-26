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

const missingNumbers = {
  1: "Thiếu số 1: Thiếu sự quyết đoán, đôi khi thấy lạc lõng hoặc khó khẳng định bản tính cá nhân trước đám đông. Cần học cách tự lập và tin vào chính mình => điền số 1 ảo bằng cách tập viết nhật ký (viết điều mình chưa làm hoặc hối tiếc đã làm trong ngày), tập bày tỏ quan điểm cá nhân bộc lộ vui buồn rõ ràng hơn",
  2: "Thiếu số 2: Thiếu sự nhạy cảm và thấu cảm. Thường có xu hướng nhìn nhận cuộc sống một cách máy móc, logic thuần túy mà bỏ qua các tín hiệu từ cảm xúc hoặc linh tính. Cần học cách lắng nghe và kiên nhẫn hơn.",
  3: "Thiếu số 3: Thiếu động lực sáng tạo hoặc gặp khó khăn trong việc tiếp thu các kiến thức học thuật khô khan. Cần kích thích bởi những sở thích mớ => điền số 3 ảo bằng cách kiếm cái gì đó để học",
  4: "Thiếu số 4: Thiếu tính thực tế, làm việc hay tùy hứng, thiếu kiên nhẫn với các chi tiết tỉ mỉ, thường gặp khó khăn trong việc quản lý tài chính hoặc duy trì một nếp sống ngăn nắp => điền số 4 ảo bằng cách thấy người ta làm gì thì mình nhào vô làm phụ người khác, chủ động dọn dẹp làm việc chân tay",
  5: "Thiếu số 5: khó biểu đạt cảm xúc, cần sự thúc đẩy mạnh mẽ từ người khác mới có thể hành động. Dễ cảm thấy bị ngăn cách với thế giới xung quanh => điền số 5 ảo bằng cách mở lòng, chịu khó kết nối với mọi người xung quanh, chịu khó đứng trước đám đông bày tỏ cảm xúc của mình, chịu khó tập yoga, chịu khó tập các động tác nơi cổ để thông suốt",
  6: "Thiếu số 6: thiếu sự quan tâm đúng mực đến gia đình hoặc thiếu đi sự tinh tế trong thẩm mỹ. Đôi khi họ sống hơi tách biệt. Cần học cách yêu thương, chăm sóc người khác một cách chủ động hơn => điền số 6 ảo bằng cách tìm cái gì sáng tạo để làm như vẽ, sáng tác, thêu, làm vườn hay làm việc nhà như rửa chén, nấu cơm để kết nối với gia đình, học lan toả tình yêu thương",
  7: "Thiếu số 7: Ngại thay đổi, ngại dấn thân vào những trải nghiệm mới nếu thấy có rủi ro => điền số 7 ảo bằng cách tự mình lao vào trải nghiệm",
  8: "Thiếu số 8: Thiếu tính độc lập trong suy nghĩ, dễ bị lung lay bởi ý kiến của người khác, gặp khó khăn trong việc điều hành công việc hoặc quản lý các nguồn lực lớn => điền số 8 ảo bằng cách lĩnh hội được khi học được từ đọc kinh chú",
  9: "Thiếu số 9: Thiếu mục đích lớn, thiếu trách nhiệm với cộng đồng, chỉ quan tâm đến những lợi ích nhỏ trước mắt. Cần học cách xây dựng lý tưởng sống => điền số 9 ảo bằng cách Tập lên kế hoạch nhỏ và làm liền cho tới nơi tới chốn",
};

export { getContentOccurrenceNumber, missingNumbers };

const so1 = {
  1: "Gặp khó khăn trong việc diễn đạt cảm xúc bằng lời nói, đôi khi nói ngược lại với những gì mình nghĩ như một cách tự vệ hoặc nói không hết ý dẫn đến việc bị hiểu lầm.",
  2: "Diễn đạt tốt, nhìn nhận vấn đề đa chiều và biết cách bảo vệ quan điểm cá nhân.",
  3: "Thường có 2 nhóm, nhóm phổ biến là nhóm những người nói nhiều(đôi khi nói hớ), vui vẻ và nhóm thiểu số là nhóm những người hướng nội (thường trống 258), im lặng tuyệt đối và diễn đạt tốt hơn qua việc viết lách.",
  4: "Gặp khó khăn trong giao tiếp, dễ bị hiểu lầm, bị ức chế cái tôi nặng nề, thường cảm thấy cô đơn và đôi khi bị ám ảnh hoặc quá coi trọng ngoại hình của bản thân, thường che giấu cảm xúc thật bằng một nụ cười nhưng bên trong lại đầy xáo trộn thế nên cần suy nghĩ thận trọng trước khi phát biểu, phản ứng chậm lại với ý kiến trái chiều.",
};

const so2 = {
  1: "Mức độ trực giác cơ bản, đủ để nhận diện cảm xúc (đối với đàn ông thì 1 con số 2 thường nam tính mạnh còn 2 con số 2 là đẹp nhất).",
  2: "Trực giác rất nhạy bén, khả năng đọc vị người khác hoặc tình huống cực kỳ chính xác.",
  3: "Quá nhạy cảm, dễ bị ảnh hưởng bởi năng lượng tiêu cực của người khác, dễ xúc động mạnh và đôi khi tự tạo ra vỏ bọc xa cách để bảo vệ bản thân.",
  4: "Thiếu kiên nhẫn, nhạy cảm thái quá, nóng tính dễ bị kích động và dễ suy diễn sai lệch, dẫn đến các rắc rối trong hôn nhân và dễ cô đơn từ đó tìm đến rượu chè, chất kích thích để giải toả.",
};

const so3 = {
  1: "Trí nhớ tốt, óc hài hước, nhanh nhạy, sống tích cực linh hoạt, ham học hỏi.",
  2: "Trí tưởng tượng phong phú, khả năng viết lách tốt nhưng cần tránh việc soi xét, phê bình người khác quá mức (ai hay lên mạng chửi do bực mình hay mất công).",
  3: "Trí tưởng tượng thái quá, dễ bị mất kết nối với thực tại, tạo ra thế giới riêng khiến họ trở nên cô lập và mất niềm tin vào người khác.",
  4: "Tâm trí luôn trong trạng thái siêu hoạt động dẫn đến sợ hãi, lo lắng, hoang tưởng và hoàn toàn không quan tâm đến các vấn đề thực tế.",
};

const so4 = {
  1: "Thích làm việc thực tế, không tin những cái trừu tượng hay giả thuyết mông lung, thích làm việc ngay lập tức không thích hẹn, ngăn nắp, thực dụng, giỏi các công việc chân tay hoặc kỹ thuật.",
  2: "Quá chú trọng vào tiểu tiết, vật chất, cần học cách linh hoạt để không trở nên cứng nhắc.",
  3: "Áp lực lao vào kiếm tiền, làm việc cực nhọc liên tục, sa đà vào vật chất, cực kỳ bảo thủ, dễ bị yếu phần chân (đầu gối, mắt cá chân và bàn chân).",
  4: "Bị vật chất chi phối cực độ, 2 chân có thể tật tạm thời hoặc vĩnh viễn.",
};

const so5 = {
  1: "Có sự cân bằng cảm xúc, thích tự do và có nhu cầu kết nối cao.",
  2: "Cực kỳ quyết tâm, nhiệt huyết và tự tin, thích mạo hiểm và đôi khi thiếu kiên trì nhưng cường độ cảm xúc quá mãnh liệt dễ gây ra các vấn đề về dạ dày hoặc viêm loét tiêu hóa nếu bị căng thẳng.",
  3: "Cảm xúc cực kỳ mãnh liệt khó kiểm soát và dễ thay đổi thất thường. Sự tự do quá mức có thể khiến bạn khó tập trung vào một mục tiêu cố định hoặc dễ rơi vào trạng thái nổi loạn.",
  4: "Cường độ cảm xúc khổng lồ chèn ép vùng luân xa thái dương, gây căng thẳng cực độ và rất dễ gặp tai nạn.",
};

const so6 = {
  1: "Có trách nhiệm với gia đình, sáng tạo tốt, có máu nghệ thuật hoặc thích cái đẹp.",
  2: "Nếu tích cực thì sáng tạo mạnh mẽ còn nếu tiêu cực sẽ dễ bị căng thẳng, lo âu, bồn chồn, tự tạo áp lực vô cớ ở nhà hoặc tại nơi làm việc, là người cầu toàn quá mức (khó tính ưa ngọt).",
  3: "Thường xuyên lo lắng thái quá cho người thân (đặc biệt là phụ nữ), bảo bọc con cái một cách sở hữu và tiêu cực, gây ngột ngạt cho bản thân và người thân.",
  4: "Tiềm năng sáng tạo khổng lồ nhưng thường bị chi phối bởi cảm xúc yếu đuối, trở thành những người lo âu thảm hại và luôn phàn nàn.",
};

const so7 = {
  1: "Có thể mất mát 1 trong 3 cái (tiền bạc, sưc khoẻ, tình cảm), học hỏi thông qua sự mất mát để trưởng thành.",
  2: "Có thể mất mát 2 trong 3 cái (tiền bạc, sưc khoẻ, tình cảm), nâng cao sự thấu hiểu triết lý và năng lực chữa lành.",
  3: "Mất mát lớn ở cả 3 khía cạnh, nếu tiêu cực sẽ trở nên trầm cảm, cay nghiệt, nhưng nếu nhận ra bài học sẽ sở hữu sự thông thái và sức mạnh nội tâm phi thường.",
  4: "Bị bủa vây bởi các sự kiện hy sinh dồn dập, đòi hỏi sự dũng cảm và hiểu biết triết lý cực kỳ sâu sắc để có thể vượt qua.",
};

const so8 = {
  1: "Ngăn nắp, tỉ mỉ, độc lập, có khả năng quản lý tài chính và cảm xúc.",
  2: "Cực kỳ độc lập và cá tính mạnh, khả năng đánh giá vấn đề sắc bén xuất sắc ở các chi tiết nhưng đôi khi dễ trở nên bướng bỉnh hoặc có xu hướng phê bình người khác quá khắt khe. Tích cực thì khôn ngoan, tiêu cực thì bồn chồn, luôn khao khát được đi lại và du lịch.",
  3: "Cảm giác bồn chồn cực độ, hay thấy bế tắc, bi quan, cần sự dẫn dắt để hướng tới năng lực độc lập và thông thái đích thực.",
  4: "Cực kỳ tăng động, bồn chồn, vô cùng khó khăn để ngồi yên một chỗ, cần được di chuyển liên tục.",
};

const so9 = {
  1: "Có lý tưởng, có trách nhiệm cá nhân ở mức tốt.",
  2: "Hoài bão lớn, lý tưởng cao cả luôn muốn giúp đỡ người khác. Tuy nhiên, nếu không có các số thực tế (1, 4, 7), dễ trở thành người mơ mộng suông.",
  3: "Cường độ tham vọng và lý tưởng khó kiểm soát, đôi khi mất cân bằng, dễ phóng đại các vấn đề nhỏ và nổi nóng mất kiểm soát.",
  4: "Hoặc là rơi vào mộng mơ xa rời xã hội, hoặc trở nên hung hăng, thích chỉ trích và hạ thấp những người không đạt được lý tưởng của họ.",
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
  1: "Thiếu số 1: Thiếu sự quyết đoán, đôi khi thấy lạc lõng hoặc khó khẳng định bản tính cá nhân trước đám đông. Cần học cách tự lập và tin vào chính mình. => điền số 1 ảo bằng cách tập viết nhật ký (viết điều mình chưa làm hoặc hối tiếc đã làm trong ngày), tập bày tỏ quan điểm cá nhân bộc lộ vui buồn rõ ràng hơn.",
  2: "Thiếu số 2: Dễ bị tổn thương lòng tự trọng và có những phản ứng thiếu khôn ngoan trước áp lực đời sống. Thiếu sự nhạy cảm và thấu cảm. Thường có xu hướng nhìn nhận cuộc sống một cách máy móc, logic thuần túy mà bỏ qua các tín hiệu từ cảm xúc hoặc linh tính. => điền số 2 ảo bằng cách cần học cách lắng nghe tiếng nói trực giác bên trong thay vì chỉ dùng logic suy đoán và kiên nhẫn hơn.",
  3: "Thiếu số 3: Dễ rơi vào trạng thái lười biếng, trì hoãn hoặc thờ ơ trong các hoạt động tư duy nếu không được rèn luyện từ nhỏ. Thiếu động lực sáng tạo hoặc gặp khó khăn trong việc tiếp thu các kiến thức học thuật khô khan. Cần kích thích bởi những sở thích mới. => điền số 3 ảo bằng cách kiếm cái gì đó để học, rèn luyện trí nhớ thường xuyên thông qua viết lách, ghi chép nhật ký trước khi đi ngủ.",
  4: "Thiếu số 4: Dễ bị thiếu kiên nhẫn, bốc đồng, làm việc không theo kế hoạch (tuỳ hứng) và gặp khó khăn với các chi tiết tỉ mỉ hoặc công việc chân tay, thường gặp khó khăn trong việc quản lý tài chính. => điền số 4 ảo bằng cách rèn luyện óc tổ chức, chú ý đến các chi tiết nhỏ và thực hành tính kiên nhẫn. Bắt tay vào các hoạt động thể chất như dọn dẹp nhà cửa, làm vườn, thêu thùa, may vá, thủ công hoặc chơi thể thao, thấy người ta làm gì thì mình nhào vô làm phụ người khác.",
  5: "Thiếu số 5: Gặp khó khăn trong việc kiểm soát cảm xúc, dễ cảm thấy bị ngăn cách với thế giới xung quanh, cần sự thúc đẩy mạnh mẽ từ người khác mới có thể hành động. => điền số 5 ảo bằng cách chủ động bày tỏ tình yêu thương vô điều kiện và lòng bao dung đối với mọi người quanh mình. Tập mở lòng chia sẻ cảm xúc chân thật thay vì kìm nén. Chịu khó tập yoga, thiền.",
  6: "Thiếu số 6: Dễ bị cuốn vào lối sống rập khuôn, thiếu sự quan tâm đúng mực đến gia đình hoặc thiếu đi sự tinh tế trong thẩm mỹ. Đôi khi họ sống hơi tách biệt. Cần học cách yêu thương, chăm sóc người khác một cách chủ động hơn. => điền số 6 ảo bằng cách tìm cái gì sáng tạo để làm như vẽ tranh, làm gốm, cắm hoa, viết lách, chơi nhạc cụ, sáng tác, thêu, làm vườn hay làm việc nhà như rửa chén, nấu cơm để kết nối với gia đình, học lan toả tình yêu thương.",
  7: "Thiếu số 7: Xảy ra 2 trường hợp, 1 là đã hoàn thành các bài học về sự hy sinh, 2 là thiếu đi thế giới quan triết học sâu sắc và phải nỗ lực thực tế để tự thấu hiểu ý nghĩa của cuộc sống. => điền số 7 ảo bằng cách tự mình lao vào trải nghiệm",
  8: "Thiếu số 8: Thiếu tính độc lập trong suy nghĩ, dễ bị lung lay bởi ý kiến của người khác, gặp khó khăn trong việc điều hành công việc hoặc quản lý các nguồn lực lớn. => điền số 8 ảo bằng cách đi du lịch trải nghiệm, học cách bày tỏ sự trân trọng và biết ơn bằng lời nói rõ ràng với người thân, lĩnh hội được khi học được từ đọc kinh chú",
  9: "Thiếu số 9: Thiếu mục đích lớn, thiếu trách nhiệm với cộng đồng, chỉ quan tâm đến những lợi ích nhỏ trước mắt. Cần học cách xây dựng lý tưởng sống. => điền số 9 ảo bằng cách tập lên kế hoạch nhỏ và làm liền cho tới nơi tới chốn.",
};

export { getContentOccurrenceNumber, missingNumbers };

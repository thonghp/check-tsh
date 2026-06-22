// File: js/contentArrows.js

const completedArrows = {
  147: "Mũi tên 1-4-7 (Thể chất): tháo vát nhanh nhẹn, thực tế (có thấy mới tin), khó chịu khi thấy người xung quanh lề mề hay trì hoãn, khéo tay nên giỏi làm việc bằng tay chân nhưng đổi lại hay ôm tất cả việc để mình làm vì nghĩ không ai làm tốt bằng mình, ko thích thì nói cũng ko làm",
  258: "Mũi tên 2-5-8 (Tâm hồn): cân bằng cảm xúc, nội tâm sâu hướng nội, dễ mơ mộng, phong thái tự tin, Nhận thức sâu sắc, nhạy bén và có khả năng thấu hiểu cảm xúc người khác thế nên thường tìm đến lĩnh vực nghệ thuật hoặc giải trí để biểu đạt cảm xúc tốt, nên biểu diễn rất là xuất sắc khi hoá thân, tư vấn tâm lý chữa lành",
  369: "Mũi tên 3-6-9 (Trí não): trí nhớ tốt, học rất giỏi nhưng dễ chảnh ko chơi với người gà hơn mình, Có 1 số đặc biệt lại có trí nhớ kém do nó chưa được khai thông, Một số đứa trẻ có thể nói cà lăm do não nhanh hơn miệng (kêu các con thư giãn chơi nhiều thể thao), Nếu có số chủ đạo là 4, 8 thì kinh doanh giỏi",
  123: "Mũi tên 1-2-3 (Kế hoạch): Đầu óc tổ chức tốt, luôn có phương án trước khi làm nên rất giỏi trong việc lập kế hoạch tổng thể (ít đi vào chi tiết), làm biếng, rất thờ ơ, chậm tiêu trong việc nhận ra mình bị bất công, Làm tốt trong khâu quản lý nhân sự hay tổ chức event, Phải kỷ luật để dạy khi còn nhỏ nhưng ko nên bắt nạt hay hù doạ để sợ mà phải nhẹ nhàng, phải dạy trẻ tôn trọng đồ của người khác chứ ko phải coi đó là đồ của mình, Có các con số chủ đạo hay con số ngày sinh nằm trong 147 thì may ra người đó mới để ý vào chi tiết",
  456: "Mũi tên 4-5-6 (Ý chí): Ý chí quật cường, biến khó khăn thành động lực để vượt qua, cứng đầu khó chịu và thích khen",
  789: "Mũi tên 7-8-9 (Hoạt động): thích di chuyển trải nghiệm ngoài trời, giàu năng lượng, làm việc ko biết mệt, quá năng động, dị ứng với ồn ào",
  159: "Mũi tên 1-5-9 (Quyết tâm): Kiên định đến cùng với mục tiêu đã chọn, nên rất lỳ bướng và cá tín, Đối với trẻ em có mũi tên này thường rất thông minh nhưng bướng bỉnh, cần sự dạy dỗ nhẹ nhàng, thuyết phục bằng lý lẽ thay vì áp đặt, Nếu có 2 mũi tên 159 sẽ tự tin quá có thể đưa ra quyết định hối hận",
  357: "Mũi tên 3-5-7 (Tâm linh):  trực giác cực kỳ nhạy bén và khả năng kết nối tâm linh mạnh mẽ. Họ không chỉ nhìn thế giới bằng mắt thường mà còn cảm nhận qua giác quan thứ sáu",
};

const emptyArrows = {
  147: "Mũi tên Trống 1-4-7 (Hỗn độn): hay mơ mộng, làm việc không theo quy trình, bừa bãi, khó thích nghi với đời sống vật chất => cần tập gọn gàng ngăn nắp.",
  258: "Mũi tên Trống 2-5-8 (Nhạy cảm): nhút nhát nhạy cảm và dễ tổn thương (thường đi ngoài đường hay cúi đầu xuống để che sự tự ti mình đi), khó kết nối sâu sắc với người khác, chăm động viên hay khen con để tránh tự ti khi lớn thì cố tỏ ra bướng bĩnh để che đi sự yếu đuối",
  369: "Mũi tên Trống 3-6-9 (Trí nhớ ngắn hạn): dễ quên những gì vừa học hoặc vừa nghe nếu không có sự tập trung cao độ, dễ xao nhãng, lười động não, tư duy thiếu hệ thống, lười đi học, Dễ bị mất trí nhớ khi già, ko cần cho đi học quá sớm",
  123: "Mũi tên Trống 1-2-3 (Trì hoãn): Thiếu kế hoạch rõ ràng, hay để việc đến phút chót.",
  456: "Mũi tên Trống 4-5-6 (Uất giận): sẽ dễ thất vọng khi không đạt được ý muốn, hay buồn phiền vô cớ, Dạy trẻ chấp nhận mọi chuyện với một tâm thế thoải mái hoan hỷ",
  789: "Mũi tên Trống 7-8-9 (Thụ động): sẽ ngại thay đổi, thụ động, thích sự ổn định đến mức trì trệ.",
  159: "Mũi tên Trống 1-5-9 (Trì hoãn): thiếu quyết tâm, hay trì hoãn lề mề để việc mai mới làm, dễ bỏ giữa chừng, nản chí hay hứa suông.",
  357: "Mũi tên Trống 3-5-7 (Hoài nghi): người khá đa nghi, không dễ tin vào bất cứ điều gì nếu không có bằng chứng rõ ràng hoặc tự mình trải nghiệm và hay đặt câu hỏi vì sao cho mọi vấn đề trong cuộc sống => nên đọc nhiều sách về tự nhiên, vật lý khoa học để trẻ tò mò nghiên cứu hay học chơi 1 nhạc cụ nào đó, vẽ hay 1 nghệ thuật nào đó",
};

export { completedArrows, emptyArrows };

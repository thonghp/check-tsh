import * as Calc from "./utils/calculator.js";
import { drawWaveChart, drawPyramidChart } from "./ui/charts.js";
import { renderNameAnalysis } from "./ui/renderers.js";
import { getContentMainNumber } from "./data/contentMainNumber.js";
import { getContentOccurrenceNumber, missingNumbers } from "./data/contentNumber.js";
import { completedArrows, emptyArrows } from "./data/contentArrows.js";
import { isolatedNumbers } from "./data/contentIsolated.js";
import { personalYearContent } from "./data/contentYear.js";

const nameInput = document.getElementById("name");
const dateInput = document.getElementById("birthDate");

// Xử lý sự kiện khi nhấn nút "Tiếp tục"
document.getElementById("btn-next").addEventListener("click", function () {
  const name = nameInput.value.trim();
  const birthDate = dateInput.value;

  if (name === "" || birthDate === "") {
    alert("Vui lòng điền đầy đủ thông tin vào các ô trống!");
    return;
  }

  const totalSum = Calc.calculateSum(birthDate);
  const mainNum = Calc.mainNumber(totalSum);

  // Định dạng hiển thị ngày từ YYYY-MM-DD sang DD/MM/YYYY
  const dateParts = birthDate.split("-");
  const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  // Đổ dữ liệu cơ bản ra giao diện
  document.getElementById("res-name").textContent = name;
  document.getElementById("res-dob").textContent = formattedDate;
  document.getElementById("res-sum").textContent = mainNum;

  // Đổ dữ liệu chi tiết của số chủ đạo
  const mainNumData = getContentMainNumber(mainNum);
  document.getElementById("tu-khoa").textContent =
    mainNumData?.["tu-khoa"] || "Chưa có dữ liệu";
  document.getElementById("nang-luc").textContent =
    mainNumData?.["nang-luc"] || "Chưa có dữ liệu";
  document.getElementById("thach-thuc").textContent =
    mainNumData?.["thach-thuc"] || "Chưa có dữ liệu";
  document.getElementById("bai-hoc").textContent =
    mainNumData?.["bai-hoc"] || "Chưa có dữ liệu";

  // Xử lý đổ dữ liệu luận giải số lần xuất hiện và số bị thiếu
  const digitCounts = Calc.countDigits(birthDate);
  const interpretationDiv = document.getElementById(
    "occurrence-interpretation",
  );
  interpretationDiv.innerHTML = "";

  // Quét từ 1 đến 9 để lấy CẢ SỐ CÓ MẶT VÀ SỐ BỊ THIẾU
  for (let i = 1; i <= 9; i++) {
    const times = digitCounts[i] || 0; // Lấy số lần xuất hiện, nếu không có là 0
    const p = document.createElement("p");

    if (times > 0) {
      // TRƯỜNG HỢP 1: CÓ XUẤT HIỆN
      const numberGroup = getContentOccurrenceNumber(i);
      if (numberGroup) {
        let textDetail = numberGroup[times];

        // Xử lý dự phòng nếu số lần xuất hiện nhiều hơn dữ liệu bạn có (Vd: xuất hiện 5 lần nhưng data chỉ có đến 3)
        if (!textDetail) {
          // Lấy nội dung của số lần xuất hiện cao nhất mà bạn đã khai báo
          const maxTimesMap = Object.keys(numberGroup).reduce((a, b) =>
            Math.max(a, b),
          );
          textDetail =
            numberGroup[maxTimesMap] +
            ` (Năng lượng cực kỳ mạnh do xuất hiện đến ${times} lần)`;
        }

        p.innerHTML = `<strong>Số ${i} (${times} lần):</strong> ${textDetail}`;
        interpretationDiv.appendChild(p);
      }
    } else {
      // TRƯỜNG HỢP 2: SỐ BỊ THIẾU (times = 0)
      p.className = "missing-number"; // Gán class vàng hổ phách để khác biệt
      p.innerHTML = `<strong>${missingNumbers[i]}</strong>`;
      interpretationDiv.appendChild(p);
    }
  }

  // --- 1. ĐIỀN SỐ VÀO BIỂU ĐỒ 1: BIỂU ĐỒ NGÀY SINH ---
  for (let i = 1; i <= 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    // Nếu số xuất hiện n lần, lặp lại nó n lần (VD: "1" xuất hiện 2 lần -> "11")
    if (digitCounts[i]) {
      cell.textContent = String(i).repeat(digitCounts[i]);
    } else {
      cell.textContent = ""; // Để trống nếu không có số
    }
  }

  // --- THÊM MỚI: TÍNH TOÁN & ĐIỀN SỐ VÀO BIỂU ĐỒ 2 (NGÀY SINH + TÊN) ---
  const nameCounts = Calc.countNameDigits(name);
  for (let i = 1; i <= 9; i++) {
    const combCell = document.getElementById(`comb-cell-${i}`);
    const dateOccur = digitCounts[i] || 0;
    const nameOccur = nameCounts[i] || 0;
    const totalOccur = dateOccur + nameOccur;

    if (totalOccur > 0) {
      combCell.textContent = String(i).repeat(totalOccur);
    } else {
      combCell.textContent = "";
    }
  }

  // --- 2. THUẬT TOÁN QUÉT MŨI TÊN ---
  const arrowLines = ["147", "258", "369", "123", "456", "789", "159", "357"];
  const arrowsDiv = document.getElementById("arrows-interpretation");
  arrowsDiv.innerHTML = ""; // Xóa dữ liệu mũi tên cũ

  let hasAnyArrow = false;

  arrowLines.forEach((line) => {
    // Cắt chuỗi "147" thành mảng ['1', '4', '7']
    const [a, b, c] = line.split("");

    // Kiểm tra xem 3 con số trên đường này có xuất hiện hay không
    const hasA = digitCounts[a] > 0;
    const hasB = digitCounts[b] > 0;
    const hasC = digitCounts[c] > 0;

    const p = document.createElement("p");

    // Nếu CẢ 3 SỐ đều CÓ -> Mũi tên đầy đủ
    if (hasA && hasB && hasC) {
      p.innerHTML = `<strong>${completedArrows[line]}</strong>`;
      arrowsDiv.appendChild(p);
      hasAnyArrow = true;
    }
    // Nếu CẢ 3 SỐ đều TRỐNG -> Mũi tên khuyết
    else if (!hasA && !hasB && !hasC) {
      p.className = "empty-arrow"; // Áp class CSS đỏ nhạt
      p.innerHTML = `<strong>${emptyArrows[line]}</strong>`;
      arrowsDiv.appendChild(p);
      hasAnyArrow = true;
    }
  });

  if (!hasAnyArrow) {
    arrowsDiv.innerHTML =
      "<p style='background: #f8fafc; border-left: 3px solid #94a3b8;'>Không có Mũi tên cá tính nổi bật hoặc khuyết hoàn toàn trên biểu đồ này.</p>";
  }

  // --- 3. THUẬT TOÁN QUÉT SỐ BỊ CÔ LẬP (ỐC ĐẢO) ---
  const isolatedDiv = document.getElementById("isolated-interpretation");
  isolatedDiv.innerHTML = ""; // Xóa dữ liệu cũ
  let hasIsolated = false;

  // Lặp qua từng trường hợp số cô lập đã định nghĩa
  for (let num in isolatedNumbers) {
    const data = isolatedNumbers[num];
    const targetNumber = parseInt(num);

    // ĐIỀU KIỆN 1: Số đó PHẢI XUẤT HIỆN trong biểu đồ
    if (digitCounts[targetNumber] > 0) {
      // ĐIỀU KIỆN 2: Tất cả các ô xung quanh (trong mảng emptyReq) PHẢI TRỐNG
      let isIsolated = true;
      for (let emptyCell of data.emptyReq) {
        if (digitCounts[emptyCell] > 0) {
          isIsolated = false; // Phát hiện có số ở ô kề bên -> Không bị cô lập
          break;
        }
      }

      // Nếu thỏa mãn cả 2 điều kiện -> In ra màn hình
      if (isIsolated) {
        const p = document.createElement("p");
        p.innerHTML = `<strong>Số ${targetNumber} cô lập (Trống ${data.emptyReq.join("")}):</strong> ${data.content}`;
        isolatedDiv.appendChild(p);
        hasIsolated = true;
      }
    }
  }

  // Nếu biểu đồ liên kết tốt, không có ốc đảo nào
  if (!hasIsolated) {
    const p = document.createElement("p");
    p.className = "no-isolated";
    p.innerHTML =
      "Không có con số nào bị cô lập. Các nguồn năng lượng trên biểu đồ của bạn đều có sự liên kết và hỗ trợ lẫn nhau.";
    isolatedDiv.appendChild(p);
  }

  // --- 4. THUẬT TOÁN TÍNH NĂM THẾ GIỚI & NĂM CÁ NHÂN ---
  const currentYear = 2026; // Đồng bộ thời gian hệ thống thực tế năm 2026
  const worldYear = Calc.reduceToSingleDigit(currentYear); // 2 + 0 + 2 + 6 = 10 -> 1

  // Bóc tách ngày tháng sinh từ mảng dữ liệu dateParts đã được xử lý phía trên (định dạng YYYY-MM-DD)
  const birthDay = parseInt(dateParts[2]);
  const birthMonth = parseInt(dateParts[1]);

  // Công thức: Năm cá nhân = Năm thế giới + Tháng sinh + Ngày sinh
  const personalYear = Calc.reduceToSingleDigit(worldYear + birthMonth + birthDay);

  // Hiển thị chỉ số ra màn hình
  document.getElementById("res-world-year").textContent =
    `${worldYear} (Từ năm gốc ${currentYear})`;
  document.getElementById("res-personal-year").textContent = personalYear;

  // Đổ nội dung luận giải tương ứng
  document.getElementById("personal-year-text").innerHTML =
    personalYearContent[personalYear];

  // Thay đổi màu sắc hộp nội dung linh hoạt nếu rơi vào năm trũng (4, 7) để cảnh báo người dùng trực quan
  const infoBox = document.getElementById("personal-year-box");
  if (personalYear === 4 || personalYear === 7) {
    infoBox.style.backgroundColor = "#fff7ed"; // Nền cam nhạt báo hiệu điểm trũng
    infoBox.style.borderLeftColor = "#f97316"; // Viền cam đậm
  } else {
    infoBox.style.backgroundColor = "#fef2f2"; // Nền đỏ nhạt tiêu chuẩn chu kỳ
    infoBox.style.borderLeftColor = "#ef4444"; // Viền đỏ tiêu chuẩn
  }

  // Gọi hàm vẽ đồ thị hình sóng sin sắc nét lên giao diện
  drawWaveChart(personalYear);

  // --- 5. TÍNH TOÁN VÀ VẼ KIM TỰ THÁP 4 ĐỈNH CAO ---
  // Truyền ngày sinh nguyên bản và số chủ đạo đã tính vào hàm
  drawPyramidChart(birthDate, mainNum);

  renderNameAnalysis(name);

  // Chuyển màn hình giao diện
  document.getElementById("screen-input").classList.add("hidden");
  document.getElementById("screen-display").classList.remove("hidden");
});

// Xử lý sự kiện khi nhấn nút "Trở lại"
document.getElementById("btn-back").addEventListener("click", function () {
  document.getElementById("screen-display").classList.add("hidden");
  document.getElementById("screen-input").classList.remove("hidden");
});

import * as Calc from "./utils/calculator.js";
import { drawWaveChart, drawPyramidChart } from "./ui/charts.js";
import {
  renderNameAnalysis,
  renderBirthNumberAnalysis,
  renderZodiacAnalysis,
} from "./ui/renderers.js";
import { getContentMainNumber } from "./data/contentMainNumber.js";
import {
  getContentOccurrenceNumber,
  missingNumbers,
} from "./data/contentNumber.js";
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
  document.getElementById("vai-tro").innerHTML =
    mainNumData?.["vai-tro"] || "Chưa có dữ liệu";
  document.getElementById("bieu-hien").innerHTML =
    mainNumData?.["bieu-hien"] || "Chưa có dữ liệu";
  document.getElementById("dac-diem").innerHTML =
    mainNumData?.["dac-diem"] || "Chưa có dữ liệu";
  document.getElementById("thach-thuc").innerHTML =
    mainNumData?.["thach-thuc"] || "Chưa có dữ liệu";
  document.getElementById("dinh-huong").innerHTML =
    mainNumData?.["dinh-huong"] || "Chưa có dữ liệu";
  document.getElementById("nghe-nghiep").innerHTML =
    mainNumData?.["nghe-nghiep"] || "Chưa có dữ liệu";

  // --- LẤY DỮ LIỆU ĐẾM SỐ ---
  const digitCounts = Calc.countDigits(birthDate); // Đếm từ ngày sinh
  const nameCounts = Calc.countNameDigits(name); // Đếm từ tên

  // Tính toán mảng đếm gộp (Ngày sinh + Tên)
  const combinedCounts = {};
  for (let i = 1; i <= 9; i++) {
    combinedCounts[i] = (digitCounts[i] || 0) + (nameCounts[i] || 0);
  }

  // --- 1. ĐIỀN SỐ VÀO CẢ 2 BIỂU ĐỒ (UI) ---
  for (let i = 1; i <= 9; i++) {
    // Biểu đồ 1: Ngày sinh
    const cell = document.getElementById(`cell-${i}`);
    cell.textContent = digitCounts[i] ? String(i).repeat(digitCounts[i]) : "";

    // Biểu đồ 2: Ngày sinh + Tên
    const combCell = document.getElementById(`comb-cell-${i}`);
    combCell.textContent = combinedCounts[i]
      ? String(i).repeat(combinedCounts[i])
      : "";
  }

  // =====================================================================
  // --- HÀM HỖ TRỢ RENDER UI CHO CẢ 2 TRƯỜNG HỢP (SENIOR REFACTOR) ---
  // =====================================================================

  // Hàm tạo HTML cho Ý nghĩa các con số
  function renderOccurrenceHTML(counts, title) {
    let html = `<div style="margin-bottom: 25px;"><h4 style="color: var(--primary); margin-bottom: 12px; font-size: 16px;">📌 ${title}</h4>`;
    for (let i = 1; i <= 9; i++) {
      const times = counts[i] || 0;
      if (times > 0) {
        const numberGroup = getContentOccurrenceNumber(i);
        if (numberGroup) {
          let textDetail = numberGroup[times];
          if (!textDetail) {
            const maxTimesMap = Math.max(
              ...Object.keys(numberGroup).map(Number),
            );
            textDetail =
              numberGroup[maxTimesMap] +
              ` <em>(Năng lượng cực kỳ mạnh do xuất hiện đến ${times} lần)</em>`;
          }
          html += `<p style="margin-bottom: 8px;"><strong>Số ${i} (${times} lần):</strong> ${textDetail}</p>`;
        }
      } else {
        html += `<p class="missing-number" style="margin-bottom: 8px;"><strong>${missingNumbers[i]}</strong></p>`;
      }
    }
    html += `</div>`;
    return html;
  }

  // Hàm tạo HTML cho Mũi tên cá tính
  function renderArrowsHTML(counts, title) {
    const arrowLines = ["147", "258", "369", "123", "456", "789", "159", "357"];
    let html = `<div style="margin-bottom: 25px;"><h4 style="color: var(--primary); margin-bottom: 12px; font-size: 16px;">🏹 ${title}</h4>`;
    let hasAnyArrow = false;

    arrowLines.forEach((line) => {
      const [a, b, c] = line.split("");
      const hasA = counts[a] > 0;
      const hasB = counts[b] > 0;
      const hasC = counts[c] > 0;

      if (hasA && hasB && hasC) {
        html += `<p style="margin-bottom: 8px;"><strong>${completedArrows[line]}</strong></p>`;
        hasAnyArrow = true;
      } else if (!hasA && !hasB && !hasC) {
        html += `<p class="empty-arrow" style="margin-bottom: 8px;"><strong>${emptyArrows[line]}</strong></p>`;
        hasAnyArrow = true;
      }
    });

    if (!hasAnyArrow) {
      html += `<p style='background: #f8fafc; border-left: 3px solid #94a3b8; padding: 10px;'>Không có Mũi tên cá tính nổi bật hoặc khuyết hoàn toàn trên biểu đồ này.</p>`;
    }
    html += `</div>`;
    return html;
  }

  // Hàm tạo HTML cho Số bị cô lập (Ốc đảo)
  function renderIsolatedHTML(counts, title) {
    let html = `<div style="margin-bottom: 25px;"><h4 style="color: var(--primary); margin-bottom: 12px; font-size: 16px;">🏝️ ${title}</h4>`;
    let hasIsolated = false;

    for (let num in isolatedNumbers) {
      const data = isolatedNumbers[num];
      const targetNumber = parseInt(num);

      if (counts[targetNumber] > 0) {
        let isIsolated = true;
        for (let emptyCell of data.emptyReq) {
          if (counts[emptyCell] > 0) {
            isIsolated = false;
            break;
          }
        }
        if (isIsolated) {
          html += `<p style="margin-bottom: 8px;"><strong>Số ${targetNumber} cô lập (Trống ${data.emptyReq.join("")}):</strong> ${data.content}</p>`;
          hasIsolated = true;
        }
      }
    }

    if (!hasIsolated) {
      html += `<p class="no-isolated" style="margin-bottom: 8px;">Không có con số nào bị cô lập. Các nguồn năng lượng trên biểu đồ này đều có sự liên kết.</p>`;
    }
    html += `</div>`;
    return html;
  }

  // =====================================================================
  // --- THỰC THI GỌI HÀM VÀ ĐỔ DỮ LIỆU (CHUYỂN SANG GIAO DIỆN SONG SONG) ---
  // =====================================================================

  // Hàm chia layout thành 2 cột Trái - Phải và tự động xuống hàng trên Mobile (Responsive)
  function createSplitLayout(leftHtml, rightHtml) {
    return `
      <div class="split-layout-grid">
        <div class="split-column left-col">
          ${leftHtml}
        </div>
        <div class="split-column right-col">
          ${rightHtml}
        </div>
      </div>
    `;
  }

  // Đổ dữ liệu Ý nghĩa các con số
  document.getElementById("occurrence-interpretation").innerHTML =
    createSplitLayout(
      renderOccurrenceHTML(digitCounts, "Biểu Đồ Ngày Sinh"),
      renderOccurrenceHTML(combinedCounts, "Biểu Đồ Ngày Sinh + Tên Gọi"),
    );

  // Đổ dữ liệu Mũi tên cá tính
  document.getElementById("arrows-interpretation").innerHTML =
    createSplitLayout(
      renderArrowsHTML(digitCounts, "Mũi Tên Ngày Sinh"),
      renderArrowsHTML(combinedCounts, "Mũi Tên Ngày Sinh + Tên"),
    );

  // Đổ dữ liệu Các số bị cô lập
  document.getElementById("isolated-interpretation").innerHTML =
    createSplitLayout(
      renderIsolatedHTML(digitCounts, "Ốc Đảo Ngày Sinh"),
      renderIsolatedHTML(combinedCounts, "Ốc Đảo Ngày Sinh + Tên"),
    );

  // --- 4. THUẬT TOÁN TÍNH NĂM THẾ GIỚI & NĂM CÁ NHÂN ---
  const currentYear = 2026; // Đồng bộ thời gian hệ thống thực tế năm 2026
  const worldYear = Calc.reduceToSingleDigit(currentYear); // 2 + 0 + 2 + 6 = 10 -> 1

  // Bóc tách ngày tháng sinh từ mảng dữ liệu dateParts đã được xử lý phía trên (định dạng YYYY-MM-DD)
  const birthDay = parseInt(dateParts[2]);
  const birthMonth = parseInt(dateParts[1]);

  // Công thức: Năm cá nhân = Năm thế giới + Tháng sinh + Ngày sinh
  const personalYear = Calc.reduceToSingleDigit(
    worldYear + birthMonth + birthDay,
  );

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
  // Con số ngày sinh
  renderBirthNumberAnalysis(birthDate);
  // Chiêm tinh học cung hoàng đạo
  renderZodiacAnalysis(birthDate);

  // Chuyển màn hình giao diện
  document.getElementById("screen-input").classList.add("hidden");
  document.getElementById("screen-display").classList.remove("hidden");
});

// Xử lý sự kiện khi nhấn nút "Trở lại"
document.getElementById("btn-back").addEventListener("click", function () {
  document.getElementById("screen-display").classList.add("hidden");
  document.getElementById("screen-input").classList.remove("hidden");
});

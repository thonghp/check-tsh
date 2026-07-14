import { analyzeName } from "../utils/calculator.js";
import { soulContent, expressContent } from "../data/contentName.js";
import { birthContent } from "../data/contentBirthNumber.js";

// Hàm render UI xuất kết quả ra màn hình
function renderNameAnalysis(fullName) {
  const indices = analyzeName(fullName);
  const soulText =
    soulContent[indices.soulNumber] || "Chưa có dữ liệu giải mã.";
  const expressText =
    expressContent[indices.expressNumber] || "Chưa có dữ liệu giải mã.";
  const nameContainer = document.getElementById("name-analysis-container");

  // Nếu không tìm thấy container thì thoát hàm để tránh lỗi
  if (!nameContainer) return;

  nameContainer.innerHTML = `
    <div style="margin-top: 30px; width: 100%; text-align: left;">
      <div style="padding: 20px; background-color: #f0fdf4; border-radius: 8px; border-left: 5px solid #22c55e;">
        <h4 style="margin: 0 0 15px 0; color: #14532d; font-size: 16px; font-weight: 700;">👤 Phân Tích Chỉ Số Tên Gọi: ${fullName.toUpperCase()} <a target="_blank" href="https://github.com/thonghp/tsh/blob/main/day6.md">Xem thêm</a></h4>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div style="border-bottom: 1px dashed #bbf7d0; padding-bottom: 10px;">
             <span style="display: inline-block; background: #22c55e; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">CHỈ SỐ TÊN: ${indices.nameNumber}</span>
             <p style="margin: 5px 0 0 0; font-size: 14px; color: #064e3b; font-style: italic;">(Tổng hòa giữa Tâm hồn [${indices.soulNumber}] và Thể hiện [${indices.expressNumber}])</p>
          </div>

          <div style="border-bottom: 1px dashed #bbf7d0; padding-bottom: 10px;">
            <span style="display: inline-block; background: #0ea5e9; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">CHỈ SỐ TÂM HỒN: ${indices.soulNumber}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #0c4a6e; line-height: 1.6;"><strong>Ý nghĩa:</strong> ${soulText}</p>
          </div>

          <div>
            <span style="display: inline-block; background: #f59e0b; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">CHỈ SỐ THỂ HIỆN: ${indices.expressNumber}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #78350f; line-height: 1.6;"><strong>Ý nghĩa:</strong> ${expressText}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBirthNumberAnalysis(birthDateStr) {
  // Lấy ra phần 'Ngày' từ chuỗi YYYY-MM-DD
  const birthDayString = birthDateStr.split("-")[2]; 
  
  // Tính tổng các chữ số của Ngày sinh
  let birthNumSum = birthDayString.split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  
  // Rút gọn về dải 1-11 và số đặc biệt 22
  let finalBirthNumber = birthNumSum;
  if (finalBirthNumber !== 11 && finalBirthNumber !== 22) {
    while (finalBirthNumber > 11 && finalBirthNumber !== 22) {
      finalBirthNumber = finalBirthNumber.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
    }
  }

  // Nếu kết quả rút gọn ra 10 hoặc 11 thì giữ nguyên, nhưng nếu bạn muốn rút 10 về 1 theo logic Thần số học truyền thống thì có thể tùy chỉnh. Ở đây code bám sát từ điển 1-11 và 22 của bạn.
  
  const birthText = birthContent[finalBirthNumber] || "Chưa có dữ liệu giải mã cho con số này.";
  const container = document.getElementById("birth-number-container");

  if (!container) return;

  container.innerHTML = `
    <div style="margin-top: 25px; width: 100%; text-align: left;">
      <div style="padding: 20px; background-color: #f8fafc; border-radius: 8px; border-left: 5px solid #0ea5e9; border: 1px solid #e2e8f0;">
        <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 16px; font-weight: 700;">
          🎂 Đặc điểm Con Số Ngày Sinh: <span style="color: #0ea5e9; font-size: 18px;">${finalBirthNumber}</span> <a target="_blank" href="https://github.com/thonghp/tsh/blob/main/day9.md">Xem thêm</a>
        </h4>
        <p style="margin: 0; font-size: 14.5px; color: #475569; line-height: 1.65;">
          ${birthText}
        </p>
      </div>
    </div>
  `;
}

export { renderNameAnalysis, renderBirthNumberAnalysis };

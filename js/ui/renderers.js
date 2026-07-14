import { analyzeName, getZodiacSign } from "../utils/calculator.js";
import { soulContent, expressContent } from "../data/contentName.js";
import { birthContent } from "../data/contentBirthNumber.js";
import { axesData, elementsData, zodiacData } from "../data/contentZodiac.js";
import * as Calc from "../utils/calculator.js";

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
             <p style="margin: 5px 0 0 0; font-size: 14px; color: #064e3b; font-style: italic;">(Tổng giữa Tâm hồn [${indices.soulNumber}] và Thể hiện [${indices.expressNumber}])</p>
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
  let birthNumSum = birthDayString
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);

  // Rút gọn về dải 1-11 và số đặc biệt 22
  let finalBirthNumber = birthNumSum;
  if (finalBirthNumber !== 11 && finalBirthNumber !== 22) {
    while (finalBirthNumber > 11 && finalBirthNumber !== 22) {
      finalBirthNumber = finalBirthNumber
        .toString()
        .split("")
        .reduce((acc, d) => acc + parseInt(d), 0);
    }
  }

  // Nếu kết quả rút gọn ra 10 hoặc 11 thì giữ nguyên, nhưng nếu bạn muốn rút 10 về 1 theo logic Thần số học truyền thống thì có thể tùy chỉnh. Ở đây code bám sát từ điển 1-11 và 22 của bạn.

  const birthText =
    birthContent[finalBirthNumber] || "Chưa có dữ liệu giải mã cho con số này.";
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

function renderZodiacAnalysis(birthDateStr) {
  const parts = birthDateStr.split("-");
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  const signName = getZodiacSign(day, month);
  if (!signName) return;

  const data = zodiacData[signName];
  const eleData = elementsData[data.element];
  const axisData = axesData[data.axis];

  const container = document.getElementById("zodiac-container");
  if (!container) return;

  // Render thẻ giao diện đồng bộ màu sắc với Nguyên Tố
  container.innerHTML = `
    <div style="margin-top: 30px;">
      <p class="panel-title" style="margin-bottom: 15px;">🌌 Chiêm Tinh Học: Cung Hoàng Đạo</p>
      
      <div style="background-color: ${eleData.bg}; border-left: 5px solid ${eleData.color}; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
          <div style="width: 50px; height: 50px; background: ${eleData.color}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 26px;">
            ${data.icon}
          </div>
          <div>
            <h4 style="margin: 0; color: #1e293b; font-size: 20px; font-weight: 700;">Cung ${signName} <span style="font-size: 14px; color: #64748b; font-weight: normal;">(${data.date})</span></h4>
            <div style="display: flex; gap: 10px; margin-top: 5px;">
               <span style="font-size: 12px; font-weight: 600; padding: 3px 8px; border-radius: 4px; background: white; color: ${eleData.color}; border: 1px solid ${eleData.color};">Nguyên tố: ${data.element}</span>
               <span style="font-size: 12px; font-weight: 600; padding: 3px 8px; border-radius: 4px; background: #f8fafc; color: #475569; border: 1px solid #cbd5e1;">Trục: ${data.axis}</span>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
           <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
             <strong style="color: #10b981;">✨ Biểu đạt (Điểm mạnh)</strong>
             <p style="margin: 8px 0 0 0; font-size: 14px; color: #475569; line-height: 1.6;">${data.bieu_dat}</p>
           </div>
           
           <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
             <strong style="color: #ef4444;">⚠️ Tiêu cực (Cần lưu ý)</strong>
             <p style="margin: 8px 0 0 0; font-size: 14px; color: #475569; line-height: 1.6;">${data.tieu_cuc}</p>
           </div>
        </div>

        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed #cbd5e1; font-size: 13.5px; color: #334155; line-height: 1.6;">
           <strong>🔥 Năng lượng Nguyên tố (${data.element}):</strong> ${eleData.desc} <br>
           <strong>🧭 Vị trí Trục (${data.axis}):</strong> ${axisData.desc}
        </div>
      </div>
    </div>
  `;
}

export { renderNameAnalysis, renderBirthNumberAnalysis, renderZodiacAnalysis };

/**
 * screenshot-module.js
 * ページを画像/PDF保存するモジュール
 * 全Week・全Dayで再利用可能
 */

const ScreenshotModule = {
    saveAsImage: function(elementSelector = '.container', fileName = null) {
        const element = document.querySelector(elementSelector);
        
        if (!element) {
            console.error('指定された要素が見つかりません:', elementSelector);
            return;
        }

        if (typeof html2canvas === 'undefined') {
            console.error('html2canvas ライブラリが読み込まれていません');
            return;
        }

        if (!fileName) {
            const date = new Date().toISOString().split('T')[0];
            const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
            fileName = `worksheet_${date}_${time}.png`;
        }

        html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#f3e5f5'
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(error => {
            console.error('画像保存に失敗しました:', error);
            alert('画像保存に失敗しました。もう一度お試しください。');
        });
    },

    saveAsPDF: function(elementSelector = '.container', fileName = null) {
        const element = document.querySelector(elementSelector);
        
        if (!element) {
            console.error('指定された要素が見つかりません:', elementSelector);
            return;
        }

        if (typeof html2pdf === 'undefined') {
            console.error('html2pdf ライブラリが読み込まれていません');
            return;
        }

        if (!fileName) {
            const date = new Date().toISOString().split('T')[0];
            const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
            fileName = `worksheet_${date}_${time}.pdf`;
        }

        const opt = {
            margin: 0.5,
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                backgroundColor: '#f3e5f5'
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };

        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .catch(error => {
                console.error('PDF保存に失敗しました:', error);
                alert('PDF保存に失敗しました。もう一度お試しください。');
            });
    },

    createSaveButtons: function(studentName, weekDay) {
        const date = new Date().toISOString().split('T')[0];
        const baseFileName = `${weekDay}_${studentName}_${date}`;
        
        return `
            <div style="margin-top: 20px; text-align: center;">
                <p style="margin-bottom: 10px; color: #7e57c2;">
                    📸 回答を保存したい方はこちら
                </p>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button 
                        onclick="ScreenshotModule.saveAsImage('.container', '${baseFileName}.png')" 
                        class="submit-btn" 
                        style="font-size: 0.9rem; padding: 10px 20px; max-width: 200px;">
                        🖼️ 画像で保存
                    </button>
                    <button 
                        onclick="ScreenshotModule.saveAsPDF('.container', '${baseFileName}.pdf')" 
                        class="submit-btn" 
                        style="font-size: 0.9rem; padding: 10px 20px; max-width: 200px;">
                        📄 PDFで保存
                    </button>
                </div>
            </div>
        `;
    }
};

// キャッシュの状態を分かりやすく表示するために使います
var cacheStatusValues = [];(1) 
cacheStatusValues[0] = '未キャッシュ'; 
cacheStatusValues[1] = 'アイドル'; 
cacheStatusValues[2] = 'チェック中'; 
cacheStatusValues[3] = 'ダウンロード中'; 
cacheStatusValues[4] = 'ダウンロード完了'; 
cacheStatusValues[5] = '無効'; 

// 発生する可能性のあるイベントをすべて監視します
var cache = window.applicationCache;(2) 
cache.addEventListener('cached', logEvent, false); 
cache.addEventListener('checking', logEvent, false); 
cache.addEventListener('downloading', logEvent, false); 
cache.addEventListener('error', logEvent, false); 
cache.addEventListener('noupdate', logEvent, false); 
cache.addEventListener('obsolete', logEvent, false); 
cache.addEventListener('progress', logEvent, false); 
cache.addEventListener('updateready', logEvent, false); 

// イベントの内容をコンソールに出力します
function logEvent(e) {(3) 
    var online, status, type, message; 
    online = (navigator.onLine) ? 'オンライン' : 'オフライン'; 
    status = cacheStatusValues[cache.status]; 
    type = e.type; 
    message = '状態: ' + online; 
    message+= ', イベント: ' + type; 
    message+= ', キャッシュ: ' + status; 
    if (type == 'error' && navigator.onLine) {
        message+= ' (マニフェストの構文エラーの可能性)'; 
    } 
    console.log(message);(4) 
} 

// ダウンロードが完了したら、新しいファイルでアプリケーションを置き換えます
window.applicationCache.addEventListener( 
    'updateready', 
    function(){
        window.applicationCache.swapCache();
        console.log('アプリケーションが新しいバージョンに置き換えられました'); 
    }, 
    false 
); 

// マニフェストへの変更を10秒おきにチェックします
setInterval(function(){cache.update()}, 10000); 

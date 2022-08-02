// вместо реальных объектов предоставляет специальные объекты-заменители
// эти объекты перехватывают вызовы к оригиналам и позволяют делать что-то до или после обращения к оригинальному объекту
// прослойка, которая помогает произвести какие-то дополнительные манипуляции до того как отдать дальнейший контроль
var OnlineMusic = /** @class */ (function () {
    function OnlineMusic() {
    }
    OnlineMusic.prototype.downloadSong = function () {
        console.log('Download the selected song');
        return true;
    };
    ;
    OnlineMusic.prototype.playSong = function () {
        console.log('The song is playing online');
    };
    ;
    return OnlineMusic;
}());
/**
 * Интерфейс Заместителя идентичен интерфейсу Реального Субъекта.
 */
var CachedMusic = /** @class */ (function () {
    /**
     * Заместитель хранит ссылку на объект класса РеальныйСубъект. Клиент может
     * либо лениво загрузить его, либо передать Заместителю.
     */
    function CachedMusic(onlineMusic) {
        this.onlineMusic = onlineMusic;
    }
    /**
     * Наиболее распространёнными областями применения паттерна Заместитель
     * являются ленивая загрузка, кэширование, контроль доступа, ведение журнала
     * и т.д. Заместитель может выполнить одну из этих задач, а затем, в
     * зависимости от результата, передать выполнение одноимённому методу в
     * связанном объекте класса Реального Субъект.
     */
    CachedMusic.prototype.playSong = function () {
        if (this.checkCache()) {
            console.log('Play the downloaded song');
        }
        else {
            this.onlineMusic.playSong();
        }
    };
    CachedMusic.prototype.checkCache = function () {
        console.log('Proxy checks the cache for the selected song');
        return this.onlineMusic.downloadSong();
    };
    CachedMusic.prototype.downloadSong = function () {
        return true;
    };
    ;
    return CachedMusic;
}());
function test(playlist) {
    playlist.playSong();
}
console.log('Client: Executing the client code with a real subject:');
var onlineMusic = new OnlineMusic();
test(onlineMusic);
console.log('');
console.log('Client: Executing the same client code with a proxy:');
var cachedMusic = new CachedMusic(onlineMusic);
test(cachedMusic);

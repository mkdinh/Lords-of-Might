
// function traverseDirectory(dirname, callback) {
//     var directory = [];
//     fs.readdir(dirname, function(err, list) {
//       dirname = fs.realpathSync(dirname);
//       if (err) {
//         return callback(err);
//       }
//       var listlength = list.length;
//       list.forEach(function(file) {
//         file = dirname + "\/" + file;
//         fs.stat(file, function(err, stat) {
//           directory.push(file);
//    if (stat && stat.isDirectory()) {
//             traverseDirectory(file, function(err, parsed) {
//        directory = directory.concat(parsed);
//        if (!--listlength) {
//          callback(null, directory);
//        }
//      });
//    } else {
//        if (!--listlength) {
//          callback(null, directory);
//        }
//             }
//         });
//       });
//     });
//   }

// var imgPath; 

// traverseDirectory(testFolder, function(err, result) {
//     if (err) {
//       console.log(err);
//     }

    
//     imgPath = result.map(function(path){
//        return path.split('\\public')[1].replace(/\\/g,"/")       
//     })
//     var object =parsePathArray(imgPath);
//     console.log(object.img.sprites.lpc)
// })

// function parsePathArray(paths) {
//     var parsed = {};
//     for(var i = 0; i < 4; i++) {
//         var position = parsed;
//         var split = paths[i].split('/');
//         for(var j = 0; j < split.length; j++) {
//             if(split[j] !== "") {
//                 if(typeof position[split[j]] === 'undefined')
//                     position[split[j]] = {};
//                 position = position[split[j]];
//             }
//         }
//     }
//     return parsed;
// }

// var spriteSheetFolder = path.join(__dirname,'./app/public/img/players/');
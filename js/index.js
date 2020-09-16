$(document).ready(function () {
    function initModal($table,$option,$modal,$button,$input,$dosomething){
        $table.bootstrapTable($option);
        $button.click(function(){
            $input.val('');
            $modal.modal('show');
        })
        $modal.find('.sure').click(function(){
            var input=$input.val();
            if(isEmpty(input)){
                alert("please type something.");
                return ;
            }else{
                $dosomething(input);
                updateXml();
                $modal.modal('hide');
            }
        })
    }
    initModal($("#excludeFoldersTable"),{
        uniqueId: "Folder",//每一行的唯一标识，一般为主键列
        pageNumber: 1,//初始化加载第一页
        pagination: true,//是否分页
        clickToSelect: true,//选中行高亮
        pageSize: 5,//单页记录数
        pageList: [10],//[5,10,20,30]   分页步进值
        sidePagination: 'client',
        queryParamsType: 'limit',
        columns: [{
            visible:false,
            field: 'id',
            title: 'id',
            align: "center",
        },{
            field: 'Folder',
            title: 'Folder',
            align: "center",
        }, {
            title: 'Operation',
            align: "center",
            events: {
                //为按钮添加事件,row为ajax返回的单条数据,index为点击的第几行
                "click .delete": function (e, value, row, index) {
                    $("#excludeFoldersTable").bootstrapTable('removeByUniqueId',row.Folder);
                    updateXml();
                },
            },
            formatter: function (value, row, index) {     //把需要创建的按钮封装在函数中
                return "<button class='btn btn-link delete'>Delete this path</button>"
            }
        }]
    }, $("#add_Folders"),$("#addFoldersButton"),$("#add_Folders_input"),function(text){
        $("#excludeFoldersTable").bootstrapTable('append',{
            Folder:text
        });
    });

    initModal($("#appendAlienBodyTypesTable"),{
        uniqueId: "AlienBodyType",//每一行的唯一标识，一般为主键列
        pageNumber: 1,//初始化加载第一页
        pagination: true,//是否分页
        clickToSelect: true,//选中行高亮
        pageSize: 5,//单页记录数
        pageList: [10],//[5,10,20,30]   分页步进值
        sidePagination: 'client',
        queryParamsType: 'limit',
        columns: [{
            visible:false,
            field: 'id',
            title: 'id',
            align: "center",
        },{
            field: 'AlienBodyType',
            title: 'AlienBodyType',
            align: "center",
        }, {
            title: 'Operation',
            align: "center",
            events: {
                //为按钮添加事件,row为ajax返回的单条数据,index为点击的第几行
                "click .delete": function (e, value, row, index) {
                    $("#appendAlienBodyTypesTable").bootstrapTable('removeByUniqueId',row.AlienBodyType);
                    updateXml();
                },
            },
            formatter: function (value, row, index) {     //把需要创建的按钮封装在函数中
                return "<button class='btn btn-link delete'>Delete this type</button>"
            }
        }]
    }, $("#add_bodyTypes"),$("#addBodyTypesButton"),$("#add_bodyType_input"),function(text){
        $("#appendAlienBodyTypesTable").bootstrapTable('append',{
            AlienBodyType:text
        });
    })

    $("#packageTable").bootstrapTable({
        uniqueId: "PackageId",//每一行的唯一标识，一般为主键列
        pageNumber: 1,//初始化加载第一页
        pagination: true,//是否分页
        clickToSelect: true,//选中行高亮
        pageSize: 5,//单页记录数
        pageList: [10],//[5,10,20,30]   分页步进值
        sidePagination: 'client',
        queryParamsType: 'limit',
        columns: [{
            field: 'PackageId',
            title: 'PackageId',
            align: "center",
        },{
            field: 'ExcludeFolders',
            title: 'ExcludeFolders',
            align: "center",
            formatter: function (value, row, index) {     //把需要创建的按钮封装在函数中
                if(!isEmpty(value)){
                    if(value.endsWith(";")){
                        value=value.substr(0,value.length-1);
                    }
                    var str="";
                    var split=value.split(";");
                    for (var i = 0; i < split.length; i++) {
                        str+='<span class="label label-info">'+split[i].trim()+'   <button class="btn btn-link" onclick="deleteFolderLabel(this)"' +
                            'data-id="{0}" data-folder="{1}">X</button>'.format(row.PackageId,split[i])+'</span>   ';
                    }
                    return str;
                }
                return "";
            }
        },{
            visible:false,
            field: 'ExplainText',
            title: 'Explain Text',
            align: "center",
        }, {
            title: 'Operation',
            align: "center",
            events: {
                //为按钮添加事件,row为ajax返回的单条数据,index为点击的第几行
                "click .delete": function (e, value, row, index) {
                    $("#packageTable").bootstrapTable('removeByUniqueId',row.PackageId);
                },
            },
            formatter: function (value, row, index) {     //把需要创建的按钮封装在函数中
                return "<button class='btn btn-link delete'>Delete this package</button>"
            }
        }]
    })

    $("#addPackageButton").click(function(){
        $("#add_packageId_input").val('');
        $("#add_exclude_folders").val('');
        $("#add_package").modal('show');
        $("#add_package").find('.sure').unbind('click').bind('click',function(){
            var packageId=$("#add_packageId_input").val();
            var folders=$("#add_exclude_folders").val();
            if(!isEmpty(folders)&&folders.endsWith(";")){
                folders=folders.substr(0,folders.length-1);
            }
            if(isEmpty(packageId)){
                alert('packageId should not empty');
                return ;
            }
            $("#packageTable").bootstrapTable('append',{
                PackageId:packageId,
                ExcludeFolders:folders,
            });
            updateXml();
            $("#add_package").modal('hide');
        });
    });

    //load default Data
    $(function(){
        $("#excludeFoldersTable").bootstrapTable('load',[
            {Folder:'Weapon'}
        ])

        $("#appendAlienBodyTypesTable").bootstrapTable('load',[
            {AlienBodyType:'Female'},
            {AlienBodyType:'Thin'},
            {AlienBodyType:'RakkleF'},
            {AlienBodyType:'RakkleM'}
        ])

        $("#packageTable").bootstrapTable('load',[
            {PackageId:'Dalrae.KurinTheThreeTailedFox',ExcludeFolders:''},
            {PackageId:'Inoshishi3.Kuro.KTTFI3A',ExcludeFolders:''},
            {PackageId:'RunneLatki.RabbieRaceMod',ExcludeFolders:'Icon;Storyteller;Head;Things/Building;Things/Drugs;Things/Food;Things/Resource;Things/Weapons;Rabbielike/Bodies;Rabbielike/Ear;Rabbielike/Hairs;Rabbielike/Heads;Rabbielike/Tails'},
            {PackageId:'GloomyLynx.DragonianRace',ExcludeFolders:'Body;Hair;Head;Things;Weapon'},
            {PackageId:'Solaris.RatkinRaceMod',ExcludeFolders:'Animal;Body;Hair;Head;Icon;Pet;Storyteller;Things;UI;Weapon'},
            {PackageId:'Nemonian.MY',ExcludeFolders:'Things/Buildings;Things/Drugs;Things/Weapons;Moyo;Icon'},
            {PackageId:'Haduki.AncientSpecies',ExcludeFolders:'AT;Wolfen;WHE/Bodies;WHE/Hairs;WHE/Heads;WHE/Weapons'},
            {PackageId:'jkviolet.rakkleracemode.copy',ExcludeFolders:'Things;Icon;Rakkles/Bodies;Rakkles/Hairs;Rakkles/Heads;Rakkles/Tails;Rakkles/Things;'},
        ])
        updateXml();
    })

    $("#download").click(function(){
        download('config.xml',$("#xmlConfig").val());
    })

});

function deleteFolderLabel($this){
    var id=$($this).attr('data-id');
    var folder=$($this).attr('data-folder');
    if(!isEmpty(id)){
        var row=$("#packageTable").bootstrapTable('getRowByUniqueId',id);
        var excludeFolders=row.ExcludeFolders;
        var str="";
        if(!isEmpty(excludeFolders)){
            var split=excludeFolders.split(";");
            for(var i=0;i<split.length;i++){
                if(split[i]!=folder){
                    str+=split[i]+";"
                }
            }
            str=str.substr(0,str.length-1);
        }
        $("#packageTable").bootstrapTable('updateByUniqueId',{
            id:id,
            row:{
                ExcludeFolders:str
            }
        })
    }
}
function updateXml(){
    var globalExcludeFolders=$("#excludeFoldersTable").bootstrapTable('getData',false);
    var appendAlienBodyTypes=$("#appendAlienBodyTypesTable").bootstrapTable('getData',false);
    var packages=$("#packageTable").bootstrapTable('getData',false);

    var config='';
    //xml声明
    config+=appendLine(appendSpace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',0));
    //xml头结点
    config+=appendLine(appendSpace('<setting>',0));
    //xml排除文件夹的全局变量
    config+=appendLine(appendSpace('<ExcludeFoldersGobal>',4));
    if(globalExcludeFolders.length>0){
        for(var i=0;i<globalExcludeFolders.length;i++){
            if(!isEmpty(globalExcludeFolders[i].Folder.trim())){
                config+=appendLine(appendSpace(appendXmlText("li",globalExcludeFolders[i].Folder),8));
            }
        }
    }
    config+=appendLine(appendSpace('</ExcludeFoldersGobal>',4));
    config+=appendLine(appendSpace('<AppendGobal>',4));
    if(appendAlienBodyTypes.length>0){
        for(var i=0;i<appendAlienBodyTypes.length;i++){
            if(!isEmpty(appendAlienBodyTypes[i].AlienBodyType.trim())){
                config+=appendLine(appendSpace(appendXmlText("li",appendAlienBodyTypes[i].AlienBodyType),8));
            }
        }
    }
    config+=appendLine(appendSpace('</AppendGobal>',4));
    config+=appendLine(appendSpace('<packages>',4));
    if(packages.length>0){
        for(var i=0;i<packages.length;i++){
            config+=appendLine(appendSpace('<package>',8));
            config+=appendLine(appendSpace(appendXmlText("packageId",packages[i].PackageId),12));
            var folders=packages[i].ExcludeFolders
            if(folders.length>0){
                var array=folders.split(";");
                if(array.length>0){
                    config+=appendLine(appendSpace('<excludeFolders>',12));
                    for(var j=0;j<array.length;j++){
                        if(!isEmpty(array[j].trim())){
                            config+=appendLine(appendSpace(appendXmlText("li",array[j]),16));
                        }
                    }
                    config+=appendLine(appendSpace('</excludeFolders>',12));
                }
            }
            if(!isEmpty(packages[i].ExplainText)){
                config+=appendLine(appendSpace(appendXmlText("explainText",packages[i].ExplainText),12));
            }
            // config+=appendLine(appendSpace(appendXmlText("excludeFolders",packages[i].excludeFolders),12));
            config+=appendLine(appendSpace('</package>',8));
        }
    }
    config+=appendLine(appendSpace('</packages>',4));
    config+=appendLine(appendSpace('</setting>',0));
    $("#xmlConfig").val(config)
}
function appendXmlText(parent,value){
    return "<"+parent+">"+value.trim()+"</"+parent+">"+"\n";
}
function appendSpace(value,length){
    var str=""
    for(var i=0;i<length;i++){
        str+=" ";
    }
    str+=value;
    return str;
}
function appendLine(value){
   return value+"\n";
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


String.prototype.format = function() {
    if (arguments.length == 0)
        return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};

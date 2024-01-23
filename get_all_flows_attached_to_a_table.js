var grActionInstance = new GlideAggregate('sys_hub_action_instance');
var strTableName = 'wm_task'; //replace with your table name

grActionInstance
    .addJoinQuery('sys_variable_value', 'sys_id', 'document_key')
    .addCondition('value', strTableName);
grActionInstance.addAggregate('count'); 
grActionInstance.orderByAggregate('count'); 
grActionInstance.groupBy('flow');
grActionInstance.addQuery('flow.sys_class_name', 'sys_hub_flow')
grActionInstance.query();

while(grActionInstance.next()) {
    gs.info(
        '[{0}]\t{1}', 
        grActionInstance.flow.active ? 'active' : 'inactive', 
        grActionInstance.flow.name
    );
}

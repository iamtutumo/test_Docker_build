Creator.resources = {}

# 将svg文件打开后，把xml内容转换为json格式(https://www.bejson.com/xml2json/)，然后执行此脚本获取icon标识：_.pluck(json.svg.symbol, "-id").join(",")
_STANDARD_SPRITE_IDS = "account,account_info,action_list_component,actions_and_buttons,activation_target,activations,address,agent_home,agent_session,aggregation_policy,all,announcement,answer_best,answer_private,answer_public,apex,apex_plugin,app,approval,apps,apps_admin,article,asset_action,asset_action_source,asset_audit,asset_downtime_period,asset_object,asset_relationship,asset_state_period,asset_warranty,assigned_resource,assignment,attach,avatar,avatar_loading,bot,bot_training,branch_merge,brand,budget,budget_allocation,bundle_config,bundle_policy,business_hours,buyer_account,buyer_group,calculated_insights,calibration,call,call_coaching,call_history,campaign,campaign_members,cancel_checkout,canvas,capacity_plan,care_request_reviewer,carousel,case,case_change_status,case_comment,case_email,case_log_a_call,case_milestone,case_transcript,case_wrap_up,catalog,category,change_request,channel_program_history,channel_program_levels,channel_program_members,channel_programs,chart,checkout,choice,client,cms,coaching,code_playground,code_set,code_set_bundle,collection,collection_variable,connected_apps,constant,contact,contact_list,contact_request,contract,contract_line_item,contract_payment,coupon_codes,currency,currency_input,custom,custom_component_task,custom_notification,customer_360,customer_lifecycle_analytics,customer_portal_users,customers,dashboard,dashboard_component,dashboard_ea,data_integration_hub,data_mapping,data_model,data_streams,datadotcom,dataset,date_input,date_time,decision,default,delegated_account,device,discounts,display_rich_text,display_text,document,document_reference,drafts,duration_downscale,dynamic_record_choice,education,einstein_replies,email,email_chatter,employee,employee_asset,employee_contact,employee_job,employee_job_position,employee_organization,empty,endorsement,entitlement,entitlement_policy,entitlement_process,entitlement_template,entity,entity_milestone,environment_hub,event,events,expense,expense_report,expense_report_entry,feed,feedback,field_sales,file,filter,filter_criteria,filter_criteria_rule,first_non_empty,flow,folder,forecasts,form,formula,fulfillment_order,generic_loading,global_constant,goals,group_loading,groups,guidance_center,hierarchy,high_velocity_sales,historical_adherence,holiday_operating_hours,home,household,identifier,immunization,incident,individual,insights,instore_locations,investment_account,invocable_action,iot_context,iot_orchestrations,javascript_button,job_family,job_position,job_profile,kanban,key_dates,knowledge,lead,lead_insights,lead_list,letterhead,lightning_component,lightning_usage,link,list_email,live_chat,live_chat_visitor,location,location_permit,log_a_call,logging,loop,macros,maintenance_asset,maintenance_plan,maintenance_work_rule,marketing_actions,med_rec_recommendation,med_rec_statement_recommendation,medication,medication_dispense,medication_ingredient,medication_reconciliation,medication_statement,merge,messaging_conversation,messaging_session,messaging_user,metrics,multi_picklist,multi_select_checkbox,network_contract,news,note,number_input,observation_component,omni_supervisor,operating_hours,opportunity,opportunity_contact_role,opportunity_splits,orchestrator,order_item,orders,outcome,output,partner_fund_allocation,partner_fund_claim,partner_fund_request,partner_marketing_budget,partners,password,past_chat,patient_medication_dosage,payment_gateway,people,performance,person_account,person_language,person_name,photo,picklist_choice,picklist_type,planogram,poll,portal,portal_roles,portal_roles_and_subordinates,post,practitioner_role,price_book_entries,price_books,pricebook,pricing_workspace,problem,procedure,procedure_detail,process,process_exception,product,product_consumed,product_consumed_state,product_item,product_item_transaction,product_quantity_rules,product_request,product_request_line_item,product_required,product_service_campaign,product_service_campaign_item,product_transfer,product_transfer_state,product_warranty_term,product_workspace,products,promotion_segments,promotions,promotions_workspace,propagation_policy,proposition,qualifications,question_best,question_feed,queue,quick_text,quip,quip_sheet,quotes,radio_button,read_receipts,recent,recipe,record,record_create,record_delete,record_lookup,record_signature_task,record_update,recycle_bin,related_list,relationship,reply_text,report,report_type,resource_absence,resource_capacity,resource_preference,resource_skill,restriction_policy,return_order,return_order_line_item,reward,rtc_presence,sales_cadence,sales_cadence_target,sales_channel,sales_path,sales_value,salesforce_cms,scan_card,schedule_objective,scheduling_constraint,scheduling_policy,screen,search,section,segments,selling_model,serialized_product,serialized_product_transaction,service_appointment,service_appointment_capacity_usage,service_contract,service_crew,service_crew_member,service_report,service_request,service_request_detail,service_resource,service_territory,service_territory_location,service_territory_member,service_territory_policy,settings,shift,shift_pattern,shift_pattern_entry,shift_preference,shift_scheduling_operation,shift_template,shift_type,shipment,skill,skill_entity,skill_requirement,slack,slider,sms,snippet,snippets,sobject,sobject_collection,social,solution,sort,sort_policy,sossession,stage,stage_collection,steps,store,store_group,story,strategy,survey,swarm_request,swarm_session,system_and_global_variable,tableau,task,task2,team_member,template,text,text_template,textarea,textbox,thanks,thanks_loading,timesheet,timesheet_entry,timeslot,today,toggle,topic,topic2,tour,tour_check,trailhead,trailhead_alt,travel_mode,unified_health_score,unmatched,user,user_role,variable,variation_attribute_setup,variation_products,video,visit_templates,visits,visualforce_page,voice_call,waits,warranty_term,webcart,work_capacity_limit,work_capacity_usage,work_contract,work_forecast,work_order,work_order_item,work_plan,work_plan_rule,work_plan_template,work_plan_template_entry,work_queue,work_step,work_step_template,work_type,work_type_group,workforce_engagement"

Creator.resources.sldsIcons = {
	standard: _STANDARD_SPRITE_IDS.split(",")
}
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import django.contrib.postgres.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.TAIGA_USER_MODEL),
        ('projects', '0023_auto_20150721_1511'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='public_permissions',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(choices=[('view_project', 'View project'), ('star_project', 'Star project'), ('view_milestones', 'View milestones'), ('add_milestone', 'Add milestone'), ('modify_milestone', 'Modify milestone'), ('delete_milestone', 'Delete milestone'), ('view_us', 'View user story'), ('add_us', 'Add user story'), ('modify_us', 'Modify user story'), ('delete_us', 'Delete user story'), ('vote_us', 'Vote user story'), ('view_tasks', 'View tasks'), ('add_task', 'Add task'), ('modify_task', 'Modify task'), ('delete_task', 'Delete task'), ('vote_task', 'Vote task'), ('view_issues', 'View issues'), ('add_issue', 'Add issue'), ('modify_issue', 'Modify issue'), ('delete_issue', 'Delete issue'), ('vote_issue', 'Vote issue'), ('view_wiki_pages', 'View wiki pages'), ('add_wiki_page', 'Add wiki page'), ('modify_wiki_page', 'Modify wiki page'), ('delete_wiki_page', 'Delete wiki page'), ('view_wiki_links', 'View wiki links'), ('add_wiki_link', 'Add wiki link'), ('modify_wiki_link', 'Modify wiki link'), ('delete_wiki_link', 'Delete wiki link')]), blank=True, default=list, null=True, size=None, verbose_name='user permissions'),
            preserve_default=True,
        ),
    ]

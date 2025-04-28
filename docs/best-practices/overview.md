---
sidebar_position: 1
slug: /best-practices
title: Overview
---

import {Card, CardContainer} from '../../src/components/card';
import FaDatabase from '/img/icons/database-solid.svg';
import FaGears from '/img/icons/gears-solid.svg';
import FaSearchengin from '/img/icons/searchengin-brands-solid.svg';

# Best Practices

On these pages we have collected some best practices to help you get the best result and performance out of Enterspeed.

Please read the pages as most of the points are applicable to every Enterspeed project \- and as always, you are more than welcome to reach out if you have any questions.

<CardContainer size="large">
    <Card icon={<FaDatabase />} title="Ingest integrations" link="best-practices/ingest-integrations">
        Ingesting data from your own sources, like CMS, PIM, ERP and so on, into Enterspeed
    </Card>
    <Card icon={<FaGears />} title="Schemas" link="best-practices/schemas">
        Creating and updating views and routes for your frontend application
    </Card>
    <Card icon={<FaSearchengin />} title="Indexes (Preview feature)" link="best-practices/indexes">
        Optimizing indexes used by the Query API
    </Card>
</CardContainer>
